import { Navbar } from "@/components/layout/Navbar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { DashboardCharts } from "@/components/admin/DashboardCharts";
import { DashboardNotifications } from "@/components/admin/DashboardNotifications";

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
          
          <DashboardStats />
          <DashboardCharts />
          <DashboardNotifications />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;