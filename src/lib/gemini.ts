import { GoogleGenAI } from "@google/genai";
import { ResumeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function enhanceSummary(data: ResumeData): Promise<string> {
  const text = data.personalInfo.summary;
  if (!text || text.length < 5) return text;
  
  const context = `
    Job Title Target: ${data.personalInfo.title}
    Skills: ${data.skills.join(', ')}
    Experience: ${data.experiences.map(e => `${e.position} at ${e.company}`).join('; ')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert resume writer. Enhance the professional summary below. 
      Use the following intelligence from the resume to make it highly relevant and impactful:
      ${context}

      CRITICAL: Return ONLY the enhanced paragraph. Do not include any preamble, quotes, suggestions, or notes.
      
      Original Summary to Enhance: ${text}`,
    });
    
    // Clean potential markdown or quotes
    let result = response.text || text;
    result = result.replace(/^["']|["']$/g, '').trim();
    return result;
  } catch (error) {
    console.error("Error enhancing text:", error);
    return text;
  }
}
