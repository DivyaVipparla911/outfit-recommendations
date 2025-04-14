
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const styleOptions = [
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "minimalist", label: "Minimalist" },
  { id: "vintage", label: "Vintage" },
  { id: "streetwear", label: "Streetwear" },
  { id: "bohemian", label: "Bohemian" },
  { id: "preppy", label: "Preppy" },
  { id: "athleisure", label: "Athleisure" },
];

const colorOptions = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
  { id: "red", label: "Red" },
  { id: "yellow", label: "Yellow" },
  { id: "purple", label: "Purple" },
  { id: "pink", label: "Pink" },
  { id: "beige", label: "Beige" },
  { id: "gray", label: "Gray" },
];

const occasionOptions = [
  { id: "casual", label: "Casual" },
  { id: "work", label: "Work" },
  { id: "formal", label: "Formal Event" },
  { id: "date", label: "Date Night" },
  { id: "outdoor", label: "Outdoor Activity" },
  { id: "workout", label: "Workout" },
  { id: "travel", label: "Travel" },
];

const seasonOptions = [
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "fall", label: "Fall" },
  { id: "winter", label: "Winter" },
];

const bodyTypeOptions = [
  { value: "hourglass", label: "Hourglass" },
  { value: "apple", label: "Apple" },
  { value: "pear", label: "Pear" },
  { value: "rectangle", label: "Rectangle" },
  { value: "inverted-triangle", label: "Inverted Triangle" },
];

export const StyleForm = () => {
  const { setStyleProfile } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    gender: "neutral",
    style: [] as string[],
    colors: [] as string[],
    occasions: [] as string[],
    seasons: [] as string[],
    bodyType: "",
  });

  const handleStyleChange = (style: string) => {
    setFormData(prev => {
      const styles = prev.style.includes(style)
        ? prev.style.filter(s => s !== style)
        : [...prev.style, style];
      return { ...prev, style: styles };
    });
  };

  const handleColorChange = (color: string) => {
    setFormData(prev => {
      const colors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      return { ...prev, colors };
    });
  };

  const handleOccasionChange = (occasion: string) => {
    setFormData(prev => {
      const occasions = prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion];
      return { ...prev, occasions };
    });
  };

  const handleSeasonChange = (season: string) => {
    setFormData(prev => {
      const seasons = prev.seasons.includes(season)
        ? prev.seasons.filter(s => s !== season)
        : [...prev.seasons, season];
      return { ...prev, seasons };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert("Please enter your name");
      return;
    }
    
    if (formData.style.length === 0) {
      alert("Please select at least one style preference");
      return;
    }
    
    setStyleProfile({
      id: Date.now().toString(),
      ...formData,
    });
    
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-fashion-primary">Basic Information</CardTitle>
          <CardDescription>Tell us a bit about yourself</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              className="border-fashion-primary/30 focus:border-fashion-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Gender Preference</Label>
            <RadioGroup
              defaultValue={formData.gender}
              onValueChange={value => setFormData({ ...formData, gender: value })}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="masculine" id="masculine" />
                <Label htmlFor="masculine">Masculine</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feminine" id="feminine" />
                <Label htmlFor="feminine">Feminine</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Gender Neutral</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Body Type</Label>
            <Select
              value={formData.bodyType}
              onValueChange={value => setFormData({ ...formData, bodyType: value })}
            >
              <SelectTrigger className="border-fashion-primary/30">
                <SelectValue placeholder="Select your body type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-fashion-primary">Style Preferences</CardTitle>
          <CardDescription>Let us know what styles you prefer</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Style Aesthetics (select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              {styleOptions.map(style => (
                <div key={style.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`style-${style.id}`}
                    checked={formData.style.includes(style.id)}
                    onCheckedChange={() => handleStyleChange(style.id)}
                    className="data-[state=checked]:bg-fashion-primary data-[state=checked]:border-fashion-primary"
                  />
                  <Label htmlFor={`style-${style.id}`}>{style.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">Favorite Colors (select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-2">
              {colorOptions.map(color => (
                <div key={color.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.id}`}
                    checked={formData.colors.includes(color.id)}
                    onCheckedChange={() => handleColorChange(color.id)}
                    className="data-[state=checked]:bg-fashion-primary data-[state=checked]:border-fashion-primary"
                  />
                  <Label htmlFor={`color-${color.id}`}>{color.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">Common Occasions (select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              {occasionOptions.map(occasion => (
                <div key={occasion.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`occasion-${occasion.id}`}
                    checked={formData.occasions.includes(occasion.id)}
                    onCheckedChange={() => handleOccasionChange(occasion.id)}
                    className="data-[state=checked]:bg-fashion-primary data-[state=checked]:border-fashion-primary"
                  />
                  <Label htmlFor={`occasion-${occasion.id}`}>{occasion.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">Preferred Seasons (select all that apply)</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
              {seasonOptions.map(season => (
                <div key={season.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`season-${season.id}`}
                    checked={formData.seasons.includes(season.id)}
                    onCheckedChange={() => handleSeasonChange(season.id)}
                    className="data-[state=checked]:bg-fashion-primary data-[state=checked]:border-fashion-primary"
                  />
                  <Label htmlFor={`season-${season.id}`}>{season.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
          >
            Create Style Profile
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
