const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');

/**
 * Predefined local fallback responses to ensure simulation never fails
 */
const PREDEFINED_SCAMS = [
    "Hello, this is SBI customer support. Your account will be blocked today due to suspicious activity. Please share your OTP immediately to verify your identity.",
    "Congratulations! You have won a cash prize of ₹25,00,000 in the KBC Lucky Draw. To claim your prize, please send your Aadhaar card photo and bank details.",
    "Your delivery package is pending at our warehouse. We need a small re-validation fee of ₹5 to confirm your local delivery hub. Please click the link to pay.",
    "Hey, it's me! I'm in a huge trouble at the hospital and my UPI is not working. Can you please send ₹2,000 urgently? I'll pay you back tonight.",
    "This is an automated alert from your bank. A transaction of ₹50,000 is pending. If not done by you, share the OTP received to cancel it immediately."
];

const SCAMMER_SYSTEM_PROMPT = `You are roleplaying as an online scammer attempting to trick the user into sharing sensitive information such as OTP, passwords, or banking details. 
Use common scam tactics such as urgency, impersonating bank support, or fake rewards.
Stay in character. Do NOT be helpful. Your goal is to get the secret info.
Keep responses short and conversational.`;

const EVALUATION_PROMPT = `You are analyzing a cybersecurity training simulation. A user is interacting with a scammer chatbot.
Analyze the user message and classify it into one of these categories:

SUCCESS – The user recognized the scam or refused to share sensitive information.
FAILURE – The user shared sensitive information such as OTP, PIN, password, or banking details.
CONTINUE – The user neither shared sensitive information nor clearly rejected the scam.

Respond with only one word: SUCCESS, FAILURE, or CONTINUE.`;

/**
 * --- EVALUATION LOGIC ---
 */

const callEvaluatorGemini = async (userMessage) => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('YOUR_')) throw new Error('Key missing');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${EVALUATION_PROMPT}\n\nUser Message: "${userMessage}"\n\nClassification:`;
    const result = await model.generateContent(prompt);
    return result.response.text().trim().toUpperCase();
};

const callEvaluatorGroq = async (userMessage) => {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes('YOUR_')) throw new Error('Key missing');

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: `${EVALUATION_PROMPT}\n\nUser Message: "${userMessage}"` }],
        temperature: 0,
        max_tokens: 10
    }, {
        headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' }
    });

    return response.data.choices[0].message.content.trim().toUpperCase();
};

const localEvaluate = (text) => {
    const lowerText = text.toLowerCase();
    const sensitive = ['otp', 'pin', 'password', 'cvv', 'cvc', 'expiry', 'card number', 'atm'];
    const codes = /\b\d{4,6}\b/;

    if (codes.test(lowerText) || (sensitive.some(k => lowerText.includes(k)) && /\d/.test(lowerText))) return 'FAILURE';

    const success = ['scam', 'fraud', 'fake', 'cheat', 'liar', 'phishing', 'report', 'police', 'won\'t share', 'not giving'];
    if (success.some(phrase => lowerText.includes(phrase))) return 'SUCCESS';

    return 'CONTINUE';
};

const evaluateMessage = async (userMessage) => {
    try {
        console.log("🔹 AI Evaluation (Gemini)...");
        const res = await callEvaluatorGemini(userMessage);
        if (['SUCCESS', 'FAILURE', 'CONTINUE'].includes(res)) return res;
    } catch (e) {
        try {
            console.log("🔹 AI Evaluation (Groq)...");
            const res = await callEvaluatorGroq(userMessage);
            if (['SUCCESS', 'FAILURE', 'CONTINUE'].includes(res)) return res;
        } catch (e2) {
            console.log("🔹 Local Keyword Evaluation...");
            return localEvaluate(userMessage);
        }
    }
    return 'CONTINUE';
};

/**
 * --- SCAM GENERATION LOGIC ---
 */

const callGemini = async (message, history, scenario, difficulty, language) => {
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('YOUR_')) throw new Error('Key missing');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: `${SCAMMER_SYSTEM_PROMPT}\nCurrent Scenario: ${scenario}\nDifficulty: ${difficulty}\nLanguage: You must respond exclusively in ${language || 'english'}.`
    });

    let formattedHistory = (history || []).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));

    while (formattedHistory.length > 0 && formattedHistory[0].role === 'model') formattedHistory.shift();

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    return result.response.text();
};

const callGroq = async (message, history, scenario, difficulty, language) => {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes('YOUR_')) throw new Error('Key missing');

    const messages = [
        { role: "system", content: `${SCAMMER_SYSTEM_PROMPT}\nCurrent Scenario: ${scenario}\nDifficulty: ${difficulty}\nLanguage: You must respond exclusively in ${language || 'english'}, regardless of the language the user speaks.` },
        ...history.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        })),
        { role: "user", content: message }
    ];

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 150
    }, {
        headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' }
    });

    return response.data.choices[0].message.content;
};

/**
 * --- MAIN CONTROLLER ---
 */

const scamChat = async (req, res) => {
    const { message, history, scenario, difficulty, skipEvaluation, language } = req.body;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!message) return res.status(400).json({ message: "Message required" });

    let evaluation = 'CONTINUE';

    // Step 1: AI Evaluation (Skip if requested)
    if (!skipEvaluation) {
        evaluation = await evaluateMessage(message);
        console.log("📝 User Evaluation Result:", evaluation);

        if (evaluation !== 'CONTINUE') {
            return res.status(200).json({
                evaluation,
                text: evaluation === 'SUCCESS' ? "I'll get you next time!" : "Haha, thanks for the info!",
                time
            });
        }
    } else {
        console.log("⏩ Skipping evaluation (User challenged scammer)");
    }

    // Step 2: Generate Scam Response (If CONTINUE)
    // If evaluation was skipped, it means the user challenged the scammer.
    // Inject a specific pressure instruction for this case.
    const effectiveMessage = skipEvaluation
        ? `${message}\n\n[SYSTEM INSTRUCTION: The user is challenging your identity. Escalate the urgency and use authority impersonation to pressure them into sending the code immediately. Stay in character.]`
        : message;

    try {
        const response = await callGemini(effectiveMessage, history, scenario, difficulty, language);
        return res.status(200).json({ evaluation: 'CONTINUE', text: response, time, provider: 'gemini' });
    } catch (geminiError) {
        try {
            const response = await callGroq(effectiveMessage, history, scenario, difficulty, language);
            return res.status(200).json({ evaluation: 'CONTINUE', text: response, time, provider: 'groq' });
        } catch (groqError) {
            const randomScam = PREDEFINED_SCAMS[Math.floor(Math.random() * PREDEFINED_SCAMS.length)];
            return res.status(200).json({ evaluation: 'CONTINUE', text: randomScam, time, provider: 'local' });
        }
    }
};

module.exports = { scamChat };
