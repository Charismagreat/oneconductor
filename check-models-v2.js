const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyCH6LDJpRfJSokJtB0K48UpBWh948m0R6g";

async function testModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const models = [
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-3.1-pro-preview",
        "gemini-3.0-flash"
    ];

    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("test");
            console.log(`[PASS] ${m}`);
        } catch (e) {
            console.log(`[FAIL] ${m}: ${e.message}`);
        }
    }
}

testModels();
