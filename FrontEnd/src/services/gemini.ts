import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is missing in .env file");
}

const ai = new GoogleGenAI({
  apiKey,
});

export const askGemini = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  
  return response.text ?? "Mazrat, is sawal ka jawab hasil nahi ho saka.";
};

