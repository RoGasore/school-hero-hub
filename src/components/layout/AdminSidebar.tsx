import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  Home,
  Library,
  Settings,
  Users,
  UserCheck,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const menuItems = [
  {
    title: "Tableau de bord",
    icon: Home,
    path: "/admin",
  },
  {
    title: "Gestion des points",
    icon: GraduationCap,
    path: "/admin/grades",
  },
  {
    title: "Gestion des présences",
    icon: UserCheck,
    path: "/admin/attendance",
  },
  {
    title: "Enseignants",
    icon: Users,
    path: "/admin/teachers",
  },
  {
    title: "Bibliothèque",
    icon: Library,
    path: "/admin/library",
  },
  {
    title: "Rapports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/admin/settings",
  },
]

export function AdminSidebar() {
  const navigate = useNavigate()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}