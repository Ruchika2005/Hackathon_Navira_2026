const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

// Controller for AI Scam Chat
exports.getScamChatResponse = async (req, res) => {
    try {
        const { message, history, scenario, difficulty } = req.body;

        const apiKey = (process.env.GEMINI_API_KEY || "").trim();
        if (!apiKey) {
            return res.status(500).json({ message: "Gemini API Key is missing. Please add it to your .env file." });
        }

        // 1. Properly define System Instruction for JSON Mode
        const systemInstruction = `
            You are an AI Cybersecurity Training Simulator. 
            Act as a realistic scammer but output your thoughts in a structured JSON format.
            Stay in character as a scammer in the 'response' field.
            
            Scenario: ${scenario}
            Difficulty: ${difficulty}
            
            GOALS:
            1. Try to get sensitive info (OTP, UPI PIN, money transfer).
            2. Be manipulative and persistent.
            
            OUTPUT RULES (JSON ONLY):
            - response: Your message as the scammer.
            - suggestions: 3 short text options for the user to reply with (1 Safe/Identifying the scam, 1 Cautious, 1 Vulnerable).
            - safetyScoreEffect: A number (-20 to +10) representing how well the user just handled the situation. 
            - isGameOver: true if the user falls for the scam (gives OTP/Money) OR if they correctly identify the scam/police.
            - result: "win" if user correctly identifies scam/blocks, "lose" if they fall for it, "ongoing" otherwise.
            - report: If isGameOver is true, provide a 1-sentence summary of why.
            
            SCENARIO CONTEXTS:
            - AI Voice Cloning: Grandchild needing money for hospital/jail.
            - Electricity Bill: Power cutoff threat.
            - WhatsApp Gift: Lucky draw tax.
            - Bank KYC: Account frozen threat.
        `;

        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Optimize: Use the fastest reliable models
        const modelNames = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-2.0-flash", "gemini-pro", "gemini-1.5-pro"];
        
        // Normalize history
        let normalizedHistory = [];
        let lastRole = null;
        for (const h of history) {
            if (h.role !== lastRole) {
                normalizedHistory.push(h);
                lastRole = h.role;
            }
        }

        const historyText = normalizedHistory.map(h => `${h.role === 'user' ? 'User' : 'Scammer'}: ${h.parts[0].text}`).join("\n");
        const fullPrompt = `${historyText}\nUser: ${message}\nScammer:`;

        for (const modelName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ 
                    model: modelName, 
                    safetySettings: [
                        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
                    ],
                    generationConfig: {
                        responseMimeType: "application/json",
                        maxOutputTokens: 500,
                        temperature: 0.9
                    }
                });

                // Embed system instruction in prompt for maximum compatibility
                const result = await model.generateContent(`[SYSTEM INSTRUCTION: ${systemInstruction}]\n\n${fullPrompt}`);
                const response = await result.response;
                const jsonText = response.text();
                
                if (jsonText) {
                    const cleanedMatch = jsonText.match(/\{[\s\S]*\}/);
                    const cleanedJson = cleanedMatch ? cleanedMatch[0] : jsonText;
                    const data = JSON.parse(cleanedJson);
                    
                    return res.json({
                        response: String(data.response || "I didn't quite catch that. Could you repeat?"),
                        safetyScoreEffect: Number(data.safetyScoreEffect || 0),
                        suggestions: Array.isArray(data.suggestions) ? data.suggestions.map(s => String(s)) : [],
                        isGameOver: Boolean(data.isGameOver),
                        result: String(data.result || "ongoing"),
                        report: String(data.report || "")
                    });
                }
            } catch (err) {
                console.warn(`Gemini ${modelName} JSON failed:`, err.message);
                continue;
            }
        }

        throw new Error("All AI models failed to provide a structured response.");
    } catch (error) {
        console.error("Scam Chat Error:", error);
        res.status(500).json({ 
            message: "AI Connection Error", 
            detail: error.message 
        });
    }
};
