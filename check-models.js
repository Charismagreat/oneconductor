const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyCH6LDJpRfJSokJtB0K48UpBWh948m0R6g";

async function testModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const models = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite-preview-02-05",
        "gemini-2.0-pro-exp-02-05",
        "gemini-pro"
    ];

    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            // Minimal request to check existence and quota
            await model.generateContent("test");
            console.log(`[PASS] ${m}`);
        } catch (e) {
            console.log(`[FAIL] ${m}: ${e.message}`);
        }
    }
}

testModels();
