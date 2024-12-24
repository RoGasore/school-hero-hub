import { Navbar } from "@/components/layout/Navbar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { DashboardNotifications } from "@/components/admin/DashboardNotifications";
import { AttendanceManagement } from "@/components/admin/AttendanceManagement";
import { AttendanceReport } from "@/components/admin/AttendanceReport";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-serif font-bold text-primary">
              Tableau de Bord Administrateur
            </h1>
            <div className="text-sm text-muted-foreground">
              Période actuelle : Premier Trimestre 2024 (Ouverte)
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="attendance">Présences</TabsTrigger>
              <TabsTrigger value="reports">Rapports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <DashboardStats />
              <DashboardCharts />
              <DashboardNotifications />
            </TabsContent>

            <TabsContent value="attendance">
              <AttendanceManagement />
            </TabsContent>

            <TabsContent value="reports">
              <AttendanceReport />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;