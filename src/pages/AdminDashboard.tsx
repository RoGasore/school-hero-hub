import { Navbar } from "@/components/layout/Navbar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-primary mb-6">
            Tableau de Bord Administrateur
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte Gestion des Enseignants */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Gestion des Enseignants
              </h2>
              <p className="text-gray-600 mb-4">
                Gérez les enseignants, leurs matières et leurs classes.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Accéder
              </button>
            </div>

            {/* Carte Gestion des Élèves */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Gestion des Élèves
              </h2>
              <p className="text-gray-600 mb-4">
                Gérez les inscriptions et les affectations des élèves.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Accéder
              </button>
            </div>

            {/* Carte Gestion des Classes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Gestion des Classes
              </h2>
              <p className="text-gray-600 mb-4">
                Créez et gérez les classes et leurs emplois du temps.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Accéder
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;