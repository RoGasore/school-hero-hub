import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Trophy, Palette } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-4">
            À propos de notre école
          </h2>
          <p className="text-gray-600">
            Depuis plus de 20 ans, le Complexe Scolaire Saint Thados offre une éducation 
            de qualité en mettant l'accent sur l'innovation, la discipline et la réussite 
            académique.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <GraduationCap className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">500+</h3>
                <p className="text-gray-600">Élèves inscrits</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">40</h3>
                <p className="text-gray-600">Enseignants qualifiés</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Trophy className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">100%</h3>
                <p className="text-gray-600">Taux de réussite</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Palette className="h-8 w-8 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">20</h3>
                <p className="text-gray-600">Activités parascolaires</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};