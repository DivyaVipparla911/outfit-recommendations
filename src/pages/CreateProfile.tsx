
import { Header } from "@/components/Header";
import { StyleForm } from "@/components/StyleForm";

const CreateProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fashion-cream">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-fashion-primary mb-3">Create Your Style Profile</h1>
            <p className="text-fashion-darktext max-w-2xl mx-auto">
              Tell us about your style preferences so we can provide personalized outfit recommendations.
            </p>
          </div>
          
          <StyleForm />
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

export default CreateProfile;
