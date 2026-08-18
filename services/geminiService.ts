import { GoogleGenAI, Type } from "@google/genai";
import { GemniResponse } from "../types";

const apiKey = process.env.API_KEY || '';

export const generateAdCopy = async (description: string): Promise<GemniResponse | null> => {
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate creative ad copy for a retro-style fashion ad based on this description: "${description}". 
      I need a catchy short headline (2-3 words), a sub-headline (1 word), 4 short feature labels (2-3 words max each), a fictional brand name, and a fictional address footer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            subHeadline: { type: Type.STRING },
            labels: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            brandName: { type: Type.STRING },
            footerText: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GemniResponse;
    }
    return null;

  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
