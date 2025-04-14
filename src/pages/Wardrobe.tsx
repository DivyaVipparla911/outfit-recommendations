
import { Header } from "@/components/Header";
import { WardrobeItemCard } from "@/components/WardrobeItem";
import { WardrobeUpload } from "@/components/WardrobeUpload";
import { useApp } from "@/context/AppContext";

const Wardrobe = () => {
  const { wardrobeItems } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fashion-cream">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-fashion-primary mb-3">My Wardrobe</h1>
            <p className="text-fashion-darktext max-w-2xl mx-auto">
              Manage your clothing items and accessories. Add new items to get better outfit recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <WardrobeUpload />
            </div>
            
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-fashion-primary mb-6">
                My Items ({wardrobeItems.length})
              </h2>
              
              {wardrobeItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wardrobeItems.map(item => (
                    <WardrobeItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center border rounded-lg bg-fashion-cream">
                  <p className="text-fashion-primary">
                    Your wardrobe is empty. Add some items to get started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-fashion-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <p>Style Seeker - Powered by Gemini AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Wardrobe;
