
import { Header } from "@/components/Header";
import { StyleForm } from "@/components/StyleForm";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { OutfitCard } from "@/components/OutfitCard";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { styleProfile, outfits, recommendations } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fashion-cream">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        {!styleProfile ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-fashion-primary mb-4">Welcome to Style Seeker</h1>
              <p className="text-lg text-fashion-darktext mb-8">
                Create your style profile to get personalized outfit recommendations powered by Gemini AI
              </p>
            </div>
            <StyleForm />
          </div>
        ) : (
          <div className="space-y-12">
            <section className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-fashion-primary mb-3">
                Welcome back, {styleProfile.name}
              </h1>
              <p className="text-fashion-darktext">
                Get AI-powered outfit recommendations based on your style preferences and wardrobe items.
              </p>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <RecommendationEngine />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-fashion-primary">My Wardrobe</h2>
                  <Button 
                    onClick={() => navigate("/wardrobe")}
                    variant="outline"
                    className="border-fashion-primary text-fashion-primary hover:bg-fashion-primary hover:text-white"
                  >
                    View All
                  </Button>
                </div>
                
                {recommendations && (
                  <div className="p-4 bg-fashion-cream rounded-lg border border-fashion-primary/10 mb-6">
                    <h3 className="font-medium text-fashion-primary mb-2">AI Reasoning</h3>
                    <p className="text-sm text-fashion-darktext">
                      {recommendations.reasoning}
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-fashion-primary">Recent Outfits</h2>
                  <Button 
                    onClick={() => navigate("/outfits")}
                    variant="outline"
                    className="border-fashion-primary text-fashion-primary hover:bg-fashion-primary hover:text-white"
                  >
                    View All
                  </Button>
                </div>
                
                {outfits.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {outfits.slice(0, 2).map(outfit => (
                      <OutfitCard key={outfit.id} outfit={outfit} />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center border rounded-lg bg-fashion-cream">
                    <p className="text-fashion-primary">
                      No outfits yet. Generate your first AI recommendation!
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>
      
      <footer className="mt-auto py-6 bg-fashion-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <p>Style Seeker - Powered by Gemini AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
