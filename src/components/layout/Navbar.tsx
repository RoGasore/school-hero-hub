import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white font-serif text-xl font-bold">
              CS Saint Thados
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white hover:text-primary hover:bg-white"
              onClick={() => navigate("/login")}
            >
              Connexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};