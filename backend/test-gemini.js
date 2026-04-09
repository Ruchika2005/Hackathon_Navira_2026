const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function test() {
    try {
        console.log("Testing Gemini with API Key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello, say 'Test OK' if you hear me.");
        console.log("Response:", result.response.text());
    } catch (err) {
        console.error("TEST FAILED:", err);
    }
}

test();
