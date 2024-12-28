import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  BookOpen, 
  ChevronRight,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TeacherNavigation } from "@/components/teacher/TeacherNavigation";
import { GradeSubmission } from "@/components/teacher/GradeSubmission";
import { TeacherLibrary } from "@/components/teacher/TeacherLibrary";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [userId] = useState("temporary-teacher-id");

  const { data: teacherData, isLoading } = useQuery({
    queryKey: ['teacherData', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      // Mock data for development
      return {
        profile: {
          first_name: "Enseignant",
          last_name: "Test"
        },
        classes: [
          {
            id: "1",
            subject: "Mathématiques",
            class_id: "class-1",
            classes: {
              name: "6ème A",
              student_classes: Array(20).fill(null).map((_, i) => ({
                student_id: `student-${i}`,
                profiles: {
                  first_name: `Élève`,
                  last_name: `${i + 1}`
                }
              }))
            }
          },
          {
            id: "2",
            subject: "Physique",
            class_id: "class-2",
            classes: {
              name: "5ème B",
              student_classes: Array(18).fill(null).map((_, i) => ({
                student_id: `student-${i}`,
                profiles: {
                  first_name: `Élève`,
                  last_name: `${i + 1}`
                }
              }))
            }
          }
        ],
        notifications: [
          {
            id: "1",
            title: "Nouvelle période d'évaluation",
            message: "La période d'évaluation du premier trimestre est maintenant ouverte.",
            read: false
          }
        ]
      };
    },
    enabled: !!userId,
  });

  const renderContent = () => {
    switch (activeTab) {
      case "grades":
        return <GradeSubmission />;
      case "library":
        return <TeacherLibrary />;
      default:
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherData?.notifications?.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50'
                      }`}
                    >
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
          <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 overflow-y-auto">
            <div className="px-4 py-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {teacherData?.profile?.first_name} {teacherData?.profile?.last_name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enseignant</p>
            </div>
            <div className="px-4 mt-6">
              <TeacherNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto md:ml-64">
          <main className="container mx-auto px-4 py-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;