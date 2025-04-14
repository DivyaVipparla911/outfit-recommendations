
import { Heart } from "lucide-react";
import { Outfit } from "@/types";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OutfitCardProps {
  outfit: Outfit;
}

export const OutfitCard = ({ outfit }: OutfitCardProps) => {
  const { toggleFavorite } = useApp();
  
  // Format date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md border-fashion-primary/10">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg text-fashion-primary capitalize">
            {outfit.style} Outfit
          </CardTitle>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline" className="text-xs capitalize">
              {outfit.occasion}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {outfit.season}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleFavorite(outfit.id)}
          className={outfit.favorite ? "text-fashion-secondary" : "text-muted-foreground"}
        >
          <Heart className={outfit.favorite ? "fill-fashion-secondary" : ""} size={18} />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-grow p-4 pt-2 pb-0">
        {outfit.items.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {outfit.items.map(item => (
              <div key={item.id} className="aspect-square rounded-md overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="h-full w-full object-cover" 
                />
              </div>
            ))}
          </div>
        )}
        
        {outfit.generatedDescription && (
          <p className="text-sm text-fashion-darktext mt-2">
            {outfit.generatedDescription}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-2 mt-auto">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground">
              Created {formatDate(outfit.createdAt)}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
