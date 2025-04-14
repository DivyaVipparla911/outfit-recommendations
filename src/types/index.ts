
export interface StyleProfile {
  id: string;
  name: string;
  gender: string;
  style: string[];
  colors: string[];
  occasions: string[];
  seasons: string[];
  bodyType: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string[];
  imageUrl: string;
}

export interface Outfit {
  id: string;
  items: WardrobeItem[];
  occasion: string;
  season: string;
  style: string;
  imageUrl?: string;
  generatedDescription?: string;
  createdAt: string;
  favorite: boolean;
}

export interface AIRecommendation {
  outfits: Outfit[];
  reasoning: string;
}
