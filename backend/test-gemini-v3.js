const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        console.log("Trying gemini-1.5-flash...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Test");
        console.log("FLASH SUCCESS:", result.response.text());
    } catch (err) {
        console.error("FLASH FAILED:", err.message);
        try {
            console.log("Trying gemini-1.0-pro...");
            const model2 = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
            const result2 = await model2.generateContent("Test");
            console.log("1.0 PRO SUCCESS:", result2.response.text());
        } catch (err2) {
            console.error("1.0 PRO FAILED:", err2.message);
        }
    }
}

test();
