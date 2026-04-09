const https = require('https');
require('dotenv').config();

const key = (process.env.GEMINI_API_KEY || "").trim();

console.log("--- GOOGLE AI DIAGNOSTIC ---");
console.log("Checking API Key: " + (key ? key.substring(0, 5) + "..." + key.substring(key.length - 4) : "MISSING"));

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

https.get(url, (res) => {
    let data = '';
    console.log("Status Code:", res.statusCode);
    
    res.on('data', (chunk) => { data += chunk; });
    
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error("API ERROR:", json.error.message);
                console.error("REASON:", json.error.status);
            } else if (json.models) {
                console.log("SUCCESS! Available Models:");
                json.models.forEach(m => console.log("- " + m.name));
            } else {
                console.log("No models found in response.");
            }
        } catch (e) {
            console.error("FAILED TO PARSE RESPONSE:", data);
        }
    });
}).on('error', (err) => {
    console.error("FETCH ERROR:", err.message);
});
