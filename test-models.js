const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

async function listModels() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    console.log("Testing with API Key:", API_KEY ? "Present" : "Missing");

    const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-2.0-flash"];

    for (const modelName of modelsToTest) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log(`Success with ${modelName}:`, result.response.text());
        } catch (e) {
            console.error(`Failed with ${modelName}:`, e.message);
        }
    }
}

listModels();
