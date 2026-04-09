const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // We can't easily list models from the SDK without knowing the endpoint,
        // but let's try to force v1 version
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1' });
        const result = await model.generateContent("Test");
        console.log("Response with v1:", result.response.text());
    } catch (err) {
        console.error("V1 FAILED:", err.message);
    }
}

listModels();
