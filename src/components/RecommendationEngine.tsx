
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2, ExternalLink } from "lucide-react";
import { initGeminiApi } from "@/services/geminiService";

const occasionOptions = [
  { value: "casual", label: "Casual" },
  { value: "work", label: "Work" },
  { value: "formal", label: "Formal Event" },
  { value: "date", label: "Date Night" },
  { value: "outdoor", label: "Outdoor Activity" },
  { value: "travel", label: "Travel" },
];

export const RecommendationEngine = () => {
  const { styleProfile, wardrobeItems, generateRecommendations, isLoading } = useApp();
  const [occasion, setOccasion] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [keySubmitted, setKeySubmitted] = useState(false);
  
  const handleSubmitApiKey = () => {
    if (geminiKey.trim()) {
      initGeminiApi(geminiKey.trim());
      setKeySubmitted(true);
    } else {
      alert("Please enter a valid Gemini API key");
    }
  };
  
  const handleGetRecommendation = () => {
    if (!styleProfile) {
      alert("Please create a style profile first");
      return;
    }
    
    if (wardrobeItems.length === 0) {
      alert("Please add items to your wardrobe first");
      return;
    }
    
    if (!occasion) {
      alert("Please select an occasion");
      return;
    }
    
    // Prepare the prompt
    const stylePreferences = `
      Name: ${styleProfile.name}
      Gender Preference: ${styleProfile.gender}
      Body Type: ${styleProfile.bodyType}
      Style Preferences: ${styleProfile.style.join(", ")}
      Favorite Colors: ${styleProfile.colors.join(", ")}
      Preferred Seasons: ${styleProfile.seasons.join(", ")}
    `;
    
    const wardrobeDescription = wardrobeItems.map(item => 
      `- ${item.name} (${item.category}, ${item.color}, seasons: ${item.season.join(", ")})`
    ).join("\n");
    
    const prompt = `
      Style Profile: ${stylePreferences}
      
      Wardrobe Items:
      ${wardrobeDescription}
      
      Occasion: ${occasion}
      
      Additional Notes: ${additionalNotes}
      
      Please create outfit recommendations based on these preferences and available wardrobe items.
    `;
    
    generateRecommendations(prompt);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-fashion-primary">AI Outfit Recommendations</CardTitle>
        <CardDescription>
          Let our AI stylist create outfit recommendations based on your preferences and wardrobe
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!keySubmitted ? (
          <div className="space-y-4 p-4 border rounded-md bg-fashion-cream">
            <h3 className="text-fashion-primary font-medium">Set Up AI Recommendations</h3>
            <div className="space-y-4">
              <div className="prose prose-sm">
                <p className="text-sm text-muted-foreground">
                  To use our AI recommendation engine, you'll need a Gemini API key. Here's how to get one:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                  <li>Visit <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-fashion-primary hover:underline inline-flex items-center"
                    >
                      Google AI Studio
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </li>
                  <li>Sign in with your Google account</li>
                  <li>Create a new API key</li>
                  <li>Copy and paste it below</li>
                </ol>
              </div>
              <div className="flex gap-2">
                <Input
                  type="password"
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  placeholder="Paste your Gemini API key here"
                  className="flex-1 border-fashion-primary/30"
                />
                <Button 
                  onClick={handleSubmitApiKey}
                  className="bg-fashion-primary hover:bg-fashion-primary/90"
                >
                  Start Using AI
                </Button>
              </div>
              <div className="text-xs text-muted-foreground bg-fashion-primary/5 p-2 rounded">
                <p>🔒 Your API key is stored securely in your browser and is never sent to our servers.</p>
                <p>💡 You only need to do this once - the key will be remembered for future sessions.</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {!styleProfile ? (
              <div className="p-4 border border-fashion-primary/30 rounded-md bg-fashion-cream">
                <p className="text-center text-fashion-primary">
                  Please create a style profile to get personalized recommendations.
                </p>
              </div>
            ) : wardrobeItems.length === 0 ? (
              <div className="p-4 border border-fashion-primary/30 rounded-md bg-fashion-cream">
                <p className="text-center text-fashion-primary">
                  Please add items to your wardrobe to get outfit recommendations.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="occasion">What's the occasion?</Label>
                  <Select
                    value={occasion}
                    onValueChange={setOccasion}
                  >
                    <SelectTrigger id="occasion" className="border-fashion-primary/30">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasionOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any specific requirements? E.g., 'I'll be outdoors most of the day' or 'Temperature will be around 60°F'"
                    className="min-h-[100px] border-fashion-primary/30"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGetRecommendation}
          disabled={!keySubmitted || !styleProfile || wardrobeItems.length === 0 || !occasion || isLoading}
          className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating recommendations...
            </>
          ) : (
            "Get AI Recommendations"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
