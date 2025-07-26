const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const getGeminiResponse=async(message)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:message,
    });
    return response.text;
}

module.exports=getGeminiResponse;