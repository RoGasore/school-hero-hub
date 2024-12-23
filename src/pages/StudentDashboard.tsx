import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Book, Clock, Bell, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Statistics } from "@/components/student/Statistics";
import { GradesTable } from "@/components/student/GradesTable";
import { ChatBot } from "@/components/student/ChatBot";

const StudentDashboard = () => {
  const { toast } = useToast();
  console.log("Rendering StudentDashboard");

  // Données simulées pour démonstration
  const grades = [
    { subject: "Mathématiques", grade: 15, average: 14.2, rank: 3, teacher: "M. Dupont" },
    { subject: "Français", grade: 16, average: 15.1, rank: 2, teacher: "Mme. Martin" },
    { subject: "Histoire-Géo", grade: 14, average: 13.8, rank: 5, teacher: "M. Bernard" },
    { subject: "Sciences", grade: 17, average: 15.5, rank: 1, teacher: "Mme. Thomas" },
    { subject: "Anglais", grade: 15.5, average: 14.7, rank: 4, teacher: "M. Wilson" },
  ];

  const notifications = [
    { id: 1, message: "Devoir de mathématiques pour lundi prochain", date: "2024-02-15", type: "homework" },
    { id: 2, message: "Réunion parents-professeurs le 20 février", date: "2024-02-10", type: "meeting" },
    { id: 3, message: "Résultats des examens disponibles", date: "2024-02-08", type: "grades" },
  ];

  const upcomingEvents = [
    { id: 1, title: "Examen de Mathématiques", date: "2024-02-20", time: "08:00" },
    { id: 2, title: "Présentation Histoire", date: "2024-02-22", time: "10:30" },
  ];

  const handleMarkAsRead = () => {
    toast({
      title: "Notifications marquées comme lues",
      description: "Toutes les notifications ont été marquées comme lues",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-serif font-bold text-primary">
              Tableau de Bord Élève
            </h1>
            <div className="flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Emploi du temps
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                Ressources
              </Button>
            </div>
          </div>

          <Statistics />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* Section Événements à venir */}
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Événements à venir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <Target className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-500">
                              {event.date} à {event.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir détails
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Section Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">Mes Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <GradesTable grades={grades} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Chatbot */}
              <ChatBot />

              {/* Section Notifications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notifications
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={handleMarkAsRead}>
                    Tout marquer comme lu
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <Bell className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{notif.message}</p>
                            <p className="text-sm text-gray-500">{notif.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Voir plus
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
