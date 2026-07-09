import dotenv from "dotenv";

dotenv.config();


const geminiApiKey = process.env.GEMINI_API_KEY || "";

export const config = {
    
    openai: {
        apiKey: "",
    },
    gemini: {
        apiKey: geminiApiKey,
        model: "gemini-2.5-flash",
    },
};