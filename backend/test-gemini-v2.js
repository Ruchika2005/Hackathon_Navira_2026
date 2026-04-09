const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Try a different model name
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent("Test");
        console.log("Response:", result.response.text());
    } catch (err) {
        console.error("FLASH LATEST FAILED:", err.message);
        try {
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result2 = await model2.generateContent("Test");
            console.log("PRO SUCCESS:", result2.response.text());
        } catch (err2) {
            console.error("PRO FAILED:", err2.message);
        }
    }
}

test();
