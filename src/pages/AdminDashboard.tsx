import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminHeader } from "@/components/layout/AdminHeader"
import { AdminSidebar } from "@/components/layout/AdminSidebar"
import { DashboardStats } from "@/components/admin/DashboardStats"
import { DashboardCharts } from "@/components/admin/DashboardCharts"
import { GradesManagement } from "@/components/admin/GradesManagement"
import { AttendanceManagement } from "@/components/admin/AttendanceManagement"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"
  const navigate = useNavigate()

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="container mx-auto p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold text-primary">
                  Tableau de Bord Administrateur
                </h1>
                <div className="text-sm text-muted-foreground">
                  Période actuelle : Premier Trimestre 2024
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                  <TabsTrigger value="grades">Points</TabsTrigger>
                  <TabsTrigger value="attendance">Présences</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <DashboardStats />
                  <DashboardCharts />
                </TabsContent>

                <TabsContent value="grades">
                  <GradesManagement />
                </TabsContent>

                <TabsContent value="attendance">
                  <AttendanceManagement />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminDashboard