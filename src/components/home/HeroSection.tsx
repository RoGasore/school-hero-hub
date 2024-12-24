import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg')",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "overlay",
        }}
      />
      
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
          Bienvenue au Complexe Scolaire Saint Thados
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          L'excellence au cœur de l'éducation – Un environnement propice à l'apprentissage 
          et au développement des leaders de demain.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/programs")}
            className="bg-primary hover:bg-primary/90"
          >
            Explorer nos programmes
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/login")}
            className="bg-white/10 hover:bg-white/20 border-white"
          >
            Connexion
          </Button>
        </div>
      </div>
    </section>
  );
};