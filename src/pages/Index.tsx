import { Navbar } from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            Bienvenue au Complexe Scolaire Saint Thados
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une éducation d'excellence pour former les leaders de demain
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-serif font-bold text-primary mb-4">
              Notre Mission
            </h2>
            <p className="text-gray-600">
              Offrir une éducation de qualité qui développe le plein potentiel de chaque élève.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-serif font-bold text-secondary mb-4">
              Notre Vision
            </h2>
            <p className="text-gray-600">
              Être un établissement de référence en matière d'excellence académique.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-serif font-bold text-success mb-4">
              Nos Valeurs
            </h2>
            <p className="text-gray-600">
              Excellence, intégrité, respect et innovation dans l'éducation.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;