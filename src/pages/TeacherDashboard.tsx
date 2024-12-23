import { Navbar } from "@/components/layout/Navbar";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-primary mb-6">
            Tableau de Bord Enseignant
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Carte Mes Classes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Mes Classes
              </h2>
              <p className="text-gray-600 mb-4">
                Accédez à vos classes et à la liste de vos élèves.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Voir mes classes
              </button>
            </div>

            {/* Carte Gestion des Notes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">
                Gestion des Notes
              </h2>
              <p className="text-gray-600 mb-4">
                Enregistrez et consultez les notes de vos élèves.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Gérer les notes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;