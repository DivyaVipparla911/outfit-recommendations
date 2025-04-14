
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { styleProfile } = useApp();
  const navigate = useNavigate();
  
  return (
    <header className="w-full bg-fashion-cream py-4 px-6 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-fashion-primary">Style Seeker</h1>
        <nav className="hidden md:flex space-x-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="text-fashion-darktext hover:text-fashion-primary"
          >
            Home
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/wardrobe")}
            className="text-fashion-darktext hover:text-fashion-primary"
          >
            My Wardrobe
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/outfits")}
            className="text-fashion-darktext hover:text-fashion-primary"
          >
            Outfits
          </Button>
        </nav>
        <div className="flex items-center space-x-4">
          {styleProfile ? (
            <Button 
              variant="outline" 
              onClick={() => navigate("/profile")}
              className="border-fashion-primary text-fashion-primary hover:bg-fashion-primary hover:text-white"
            >
              My Profile
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={() => navigate("/create-profile")}
              className="bg-fashion-primary text-white hover:bg-fashion-primary/90"
            >
              Create Profile
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
