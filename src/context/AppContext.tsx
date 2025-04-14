
import React, { createContext, useContext, useState } from "react";
import { StyleProfile, WardrobeItem, Outfit, AIRecommendation } from "@/types";

// Mock data
const mockWardrobeItems: WardrobeItem[] = [
  {
    id: "1",
    name: "White T-Shirt",
    category: "tops",
    color: "white",
    season: ["spring", "summer", "fall"],
    imageUrl: "https://placehold.co/200x200/f8f4e9/4A7A8C?text=White+T-Shirt",
  },
  {
    id: "2",
    name: "Blue Jeans",
    category: "bottoms",
    color: "blue",
    season: ["spring", "fall", "winter"],
    imageUrl: "https://placehold.co/200x200/4A7A8C/f8f4e9?text=Blue+Jeans",
  },
  {
    id: "3",
    name: "Black Boots",
    category: "footwear",
    color: "black",
    season: ["fall", "winter"],
    imageUrl: "https://placehold.co/200x200/333333/f8f4e9?text=Black+Boots",
  },
];

const mockOutfits: Outfit[] = [
  {
    id: "1",
    items: mockWardrobeItems,
    occasion: "casual",
    season: "fall",
    style: "minimalist",
    createdAt: new Date().toISOString(),
    favorite: false,
    generatedDescription: "A simple, versatile outfit for everyday wear. The white t-shirt pairs perfectly with blue jeans for a classic casual look, finished with black boots for a touch of edge."
  }
];

interface AppContextType {
  styleProfile: StyleProfile | null;
  setStyleProfile: React.Dispatch<React.SetStateAction<StyleProfile | null>>;
  wardrobeItems: WardrobeItem[];
  addWardrobeItem: (item: WardrobeItem) => void;
  outfits: Outfit[];
  recommendations: AIRecommendation | null;
  isLoading: boolean;
  generateRecommendations: (prompt: string) => Promise<void>;
  toggleFavorite: (outfitId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [styleProfile, setStyleProfile] = useState<StyleProfile | null>(null);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(mockWardrobeItems);
  const [outfits, setOutfits] = useState<Outfit[]>(mockOutfits);
  const [recommendations, setRecommendations] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addWardrobeItem = (item: WardrobeItem) => {
    setWardrobeItems(prev => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const toggleFavorite = (outfitId: string) => {
    setOutfits(prev => 
      prev.map(outfit => 
        outfit.id === outfitId ? { ...outfit, favorite: !outfit.favorite } : outfit
      )
    );
  };

  // In a full implementation, this would call a Node.js backend that uses MongoDB and Gemini AI
  const generateRecommendations = async (prompt: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock recommendations
      const newOutfit: Outfit = {
        id: Date.now().toString(),
        items: wardrobeItems.slice(0, 3),
        occasion: "casual",
        season: "fall",
        style: "minimalist",
        generatedDescription: "A perfect fall outfit combining comfort and style. The white t-shirt creates a clean base, while the blue jeans add casual versatility. The black boots provide an elegant finish suitable for many occasions.",
        createdAt: new Date().toISOString(),
        favorite: false,
      };
      
      const mockRecommendation: AIRecommendation = {
        outfits: [newOutfit],
        reasoning: "Based on your style preferences for minimalist and classic looks, I've created an outfit that works well for casual fall occasions. The neutral color palette offers versatility while maintaining a cohesive look."
      };
      
      setRecommendations(mockRecommendation);
      setOutfits(prev => [...prev, ...mockRecommendation.outfits]);
    } catch (error) {
      console.error("Error generating recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        styleProfile,
        setStyleProfile,
        wardrobeItems,
        addWardrobeItem,
        outfits,
        recommendations,
        isLoading,
        generateRecommendations,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
