
import { GoogleGenAI } from "@google/genai";
import { User } from '../types';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const enhanceProfileSummary = async (summary: string): Promise<string> => {
  if (!API_KEY) {
    return "عذراً، خدمة تحسين الملخص غير متاحة حالياً.";
  }
  try {
    const prompt = `You are an expert career coach for food safety professionals. Rewrite the following professional summary to be more impactful, concise, and professional. The output must be in Arabic and should not exceed 150 words. Here is the summary: "${summary}"`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error enhancing profile summary:", error);
    return "حدث خطأ أثناء محاولة تحسين الملخص. يرجى المحاولة مرة أخرى.";
  }
};
