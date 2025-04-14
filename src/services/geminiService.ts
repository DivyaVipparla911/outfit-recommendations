
import { GoogleGenerativeAI } from "@google/generative-ai";

// In a real implementation, this would be stored securely and accessed via a backend
// For demo purposes, we handle it here but in production this should be on server-side
let API_KEY = "";

// Initialize the Gemini API
export const initGeminiApi = (apiKey: string) => {
  API_KEY = apiKey;
};

export const generateOutfitRecommendations = async (
  stylePreferences: string, 
  wardrobe: string,
  occasion: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key not set. Please set it first using initGeminiApi.");
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    You are a fashion stylist AI assistant. Please create an outfit recommendation based on the following:
    
    STYLE PREFERENCES:
    ${stylePreferences}
    
    AVAILABLE WARDROBE ITEMS:
    ${wardrobe}
    
    OCCASION:
    ${occasion}
    
    Please respond with a JSON object in this format:
    {
      "outfits": [
        {
          "name": "Outfit Name",
          "items": ["Item 1", "Item 2", "Item 3"],
          "description": "Detailed description of the outfit and how it works together"
        }
      ],
      "reasoning": "Why you chose these particular combinations"
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error generating outfit recommendations:", error);
    throw error;
  }
};

// This function would be used in production with a real Gemini API key
export const processRecommendation = async (
  stylePreferences: string, 
  wardrobe: string,
  occasion: string
) => {
  try {
    // For demo purposes, return a mock response
    // In production, this would call the Gemini API
    return {
      outfits: [
        {
          name: "Classic Casual",
          items: ["White T-Shirt", "Blue Jeans", "Black Boots"],
          description: "A timeless combination that works for everyday casual settings. The crisp white t-shirt creates a clean base, while the well-fitted jeans add a casual but put-together feel. The black boots elevate the look with a touch of edge."
        }
      ],
      reasoning: "I chose this outfit because it aligns with your minimalist style preferences while being appropriate for casual occasions. The neutral color palette makes it versatile and easy to wear."
    };
  } catch (error) {
    console.error("Error processing recommendation:", error);
    throw error;
  }
};
