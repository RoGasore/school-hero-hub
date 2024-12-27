import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Users, GraduationCap, CalendarCheck, BookOpen, ChevronRight } from "lucide-react";
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
      } else {
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  const { data: teacherData, isLoading } = useQuery({
    queryKey: ['teacherData', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .single();

      const { data: classesData, error } = await supabase
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

      return {
        profile: profileData,
        classes: classesData
      };
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">
              Bienvenue, {teacherData?.profile?.first_name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Gérez vos classes et suivez la progression de vos élèves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vue d'ensemble */}
            <Card className="col-span-full bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Vue d'ensemble
                </CardTitle>
                <CardDescription>
                  Vous avez {teacherData?.classes?.length || 0} classes et {
                    teacherData?.classes?.reduce((acc, curr) => 
                      acc + (curr.classes?.student_classes?.length || 0), 0
                    ) || 0
                  } élèves au total
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Liste des Classes */}
            <Card className="col-span-full lg:col-span-2">
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
                  {teacherData?.classes?.map((teacherClass) => (
                    <div 
                      key={teacherClass.id} 
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-lg text-gray-900 dark:text-white">
                            {teacherClass.classes?.name} - {teacherClass.subject}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {teacherClass.classes?.student_classes?.length || 0} élèves inscrits
                          </p>
                        </div>
                        <Button 
                          onClick={() => navigate(`/class/${teacherClass.class_id}`)}
                          variant="ghost"
                          className="gap-2"
                        >
                          Voir les détails
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions Rapides */}
            <Card className="col-span-full lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate("/teacher?tab=grades")}
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <GraduationCap className="h-5 w-5" />
                  Gestion des Notes
                </Button>
                <Button 
                  onClick={() => navigate("/teacher?tab=attendance")}
                  className="w-full justify-start gap-2"
                  variant="outline"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Gestion des Présences
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;