import { Navbar } from "@/components/layout/Navbar";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-primary mb-6">
            Tableau de Bord Élève
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Mes Notes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Mes Notes
              </h2>
              <p className="text-gray-600 mb-4">
                Consultez vos notes et votre classement par matière.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Voir mes notes
              </button>
            </div>

            {/* Carte Notifications */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Notifications
              </h2>
              <p className="text-gray-600 mb-4">
                Consultez les messages de l'administration et des enseignants.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Voir les notifications
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;