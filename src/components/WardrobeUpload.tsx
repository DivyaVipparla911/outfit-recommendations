
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { WardrobeItem } from "@/types";

const categoryOptions = [
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "dresses", label: "Dresses" },
  { value: "outerwear", label: "Outerwear" },
  { value: "footwear", label: "Footwear" },
  { value: "accessories", label: "Accessories" },
];

const colorOptions = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "gray", label: "Gray" },
  { value: "beige", label: "Beige" },
  { value: "brown", label: "Brown" },
  { value: "blue", label: "Blue" },
  { value: "navy", label: "Navy" },
  { value: "green", label: "Green" },
  { value: "red", label: "Red" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "multicolor", label: "Multicolor" },
];

const seasonOptions = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

export const WardrobeUpload = () => {
  const { addWardrobeItem } = useApp();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    color: string;
    season: string[];
    imageFile: File | null;
  }>({
    name: "",
    category: "",
    color: "",
    season: [],
    imageFile: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSeasonChange = (season: string) => {
    setFormData(prev => {
      const seasons = prev.season.includes(season)
        ? prev.season.filter(s => s !== season)
        : [...prev.season, season];
      return { ...prev, season: seasons };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert("Please enter an item name");
      return;
    }
    
    if (!formData.category) {
      alert("Please select a category");
      return;
    }
    
    if (!formData.color) {
      alert("Please select a color");
      return;
    }
    
    if (formData.season.length === 0) {
      alert("Please select at least one season");
      return;
    }
    
    // In a real app, we would upload the image to a server and get back a URL
    // Here we'll use the image preview data URL or a placeholder
    const newItem: WardrobeItem = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      color: formData.color,
      season: formData.season,
      imageUrl: imagePreview || `https://placehold.co/200x200/4A7A8C/f8f4e9?text=${formData.name}`,
    };
    
    addWardrobeItem(newItem);
    
    // Reset form
    setFormData({
      name: "",
      category: "",
      color: "",
      season: [],
      imageFile: null,
    });
    setImagePreview(null);
    
    // In a real app, we would have a success message
    alert("Item added to your wardrobe!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-fashion-primary">Add New Item</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., White T-Shirt"
                  className="border-fashion-primary/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={value => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category" className="border-fashion-primary/30">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select
                  value={formData.color}
                  onValueChange={value => setFormData({ ...formData, color: value })}
                >
                  <SelectTrigger id="color" className="border-fashion-primary/30">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-base">Seasons (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {seasonOptions.map(season => (
                    <div key={season.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`season-${season.value}`}
                        checked={formData.season.includes(season.value)}
                        onCheckedChange={() => handleSeasonChange(season.value)}
                        className="data-[state=checked]:bg-fashion-primary data-[state=checked]:border-fashion-primary"
                      />
                      <Label htmlFor={`season-${season.value}`}>{season.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Item Image</Label>
                <div className="flex flex-col items-center justify-center">
                  {imagePreview ? (
                    <div className="mb-4 h-48 w-48 overflow-hidden rounded-md border border-fashion-primary/30">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="mb-4 h-48 w-full flex items-center justify-center border-2 border-dashed border-fashion-primary/30 rounded-md bg-fashion-cream">
                      <span className="text-fashion-primary/50">Image Preview</span>
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-fashion-primary/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
          >
            Add to Wardrobe
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
