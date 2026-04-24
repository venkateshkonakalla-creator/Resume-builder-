import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function enhanceText(text: string, context: string): Promise<string> {
  if (!text || text.length < 10) return text;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Enhance the following professional ${context} for a resume. Make it more professional, impactful, and concise. use action verbs. keep it under 3-4 sentences.
      
      Original: ${text}`,
    });
    
    return response.text || text;
  } catch (error) {
    console.error("Error enhancing text:", error);
    return text;
  }
}
