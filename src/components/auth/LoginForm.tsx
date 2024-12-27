import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const LoginForm = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session check:", session);
        
        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          console.log("Profile check:", profile, profileError);

          if (profile) {
            redirectBasedOnRole(profile.role);
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };
    checkSession();
  }, []);

  const redirectBasedOnRole = (role: string) => {
    console.log("Redirecting based on role:", role);
    switch (role) {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }

      if (data.session) {
        console.log("Login successful, fetching profile");
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        console.log("Profile fetched:", profile);

        if (profile && profile.role === userType) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre tableau de bord",
          });
          redirectBasedOnRole(profile.role);
        } else {
          throw new Error("Type d'utilisateur incorrect");
        }
      }
    } catch (error: any) {
      console.error("Login process error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message === "Type d'utilisateur incorrect" 
          ? "Veuillez sélectionner le bon type d'utilisateur"
          : "Email ou mot de passe incorrect",
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
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};