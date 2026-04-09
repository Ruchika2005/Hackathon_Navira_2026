const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function checkModels() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const models = await genAI.listModels();
        console.log("AVAILABLE MODELS:");
        models.models.forEach(m => {
            console.log(`- ${m.name} (Methods: ${m.supportedGenerationMethods.join(", ")})`);
        });
    } catch (err) {
        console.error("LIST MODELS FAILED:", err.message);
        console.error("Error Full:", err);
    }
}

checkModels();
