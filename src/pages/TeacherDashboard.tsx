import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, GraduationCap, CalendarCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };
    checkSession();
  }, []);

  const { data: teacherClasses, isLoading } = useQuery({
    queryKey: ['teacherClasses', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('teacher_classes')
        .select(`
          id,
          subject,
          class_id,
          classes (
            id,
            name,
            student_classes (
              student_id,
              profiles (
                first_name,
                last_name
              )
            )
          )
        `)
        .eq('teacher_id', userId);

      if (error) {
        console.error('Error fetching teacher classes:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos classes",
          variant: "destructive",
        });
        return null;
      }

      return data;
    },
    enabled: !!userId,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-primary mb-8">
            Tableau de Bord Enseignant
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Carte Mes Classes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Mes Classes
                  </CardTitle>
                  <CardDescription>
                    Gérez vos classes et vos élèves
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherClasses?.map((teacherClass) => (
                      <div key={teacherClass.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <h3 className="font-medium text-lg mb-2">
                          {teacherClass.classes?.name} - {teacherClass.subject}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {teacherClass.classes?.student_classes?.length || 0} élèves
                        </p>
                        <Button 
                          onClick={() => navigate(`/class/${teacherClass.class_id}`)}
                          variant="outline"
                          className="w-full"
                        >
                          Voir les détails
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Carte Gestion des Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Gestion des Notes
                  </CardTitle>
                  <CardDescription>
                    Enregistrez et consultez les notes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate("/teacher?tab=grades")}
                    className="w-full"
                  >
                    Gérer les notes
                  </Button>
                </CardContent>
              </Card>

              {/* Carte Présences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5 text-primary" />
                    Présences
                  </CardTitle>
                  <CardDescription>
                    Gérez les présences des élèves
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate("/teacher?tab=attendance")}
                    className="w-full"
                  >
                    Gérer les présences
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;