import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [userType, setUserType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Temporairement, on redirige directement selon le type d'utilisateur
      switch (userType) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "student":
          navigate("/student");
          break;
        default:
          navigate("/");
      }

      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur votre tableau de bord",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <div className="space-y-2">
        <Select
          value={userType}
          onValueChange={(value) => setUserType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type d'utilisateur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Élève</SelectItem>
            <SelectItem value="teacher">Enseignant</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};