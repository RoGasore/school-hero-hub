import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  ClipboardList, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  User,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const navItems: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Accueil", value: "home" },
  { icon: <ClipboardList className="h-5 w-5" />, label: "Gestion des Points", value: "grades" },
  { icon: <BookOpen className="h-5 w-5" />, label: "Bibliothèque", value: "library" },
  { icon: <Calendar className="h-5 w-5" />, label: "Horaires", value: "schedule" },
  { icon: <MessageCircle className="h-5 w-5" />, label: "Messages", value: "messages" },
  { icon: <User className="h-5 w-5" />, label: "Profil", value: "profile" },
];

interface TeacherNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TeacherNavigation = ({ activeTab, onTabChange }: TeacherNavigationProps) => {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Button
          key={item.value}
          variant={activeTab === item.value ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            activeTab === item.value ? "bg-primary" : ""
          )}
          onClick={() => onTabChange(item.value)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </nav>
  );
};