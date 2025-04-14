
import { WardrobeItem as WardrobeItemType } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WardrobeItemProps {
  item: WardrobeItemType;
}

export const WardrobeItemCard = ({ item }: WardrobeItemProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg text-fashion-darktext">{item.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <Badge className="bg-fashion-primary">{item.category}</Badge>
          <span className="text-sm text-fashion-primary capitalize">{item.color}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
        {item.season.map(season => (
          <Badge key={season} variant="outline" className="text-xs border-fashion-secondary text-fashion-secondary">
            {season}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};
