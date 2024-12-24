import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-primary font-serif text-xl font-bold">
              CS Saint Thados
            </h1>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="px-3 py-2 text-sm font-medium hover:text-primary"
                  href="#"
                >
                  Accueil
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="px-3 py-2 text-sm font-medium hover:text-primary"
                  href="#about"
                >
                  À propos
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  className="px-3 py-2 text-sm font-medium hover:text-primary"
                  href="#contact"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Connexion</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/login?type=admin")}
                    >
                      Administrateur
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/login?type=teacher")}
                    >
                      Enseignant
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => navigate("/login?type=student")}
                    >
                      Élève
                    </Button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            variant="default"
            onClick={() => navigate("/registration")}
            className="ml-4"
          >
            Nous rejoindre
          </Button>
        </div>
      </div>
    </nav>
  );
};