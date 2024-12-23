import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Bell, Trophy, Calendar, Clock, Target, Book, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

          {/* Grid de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne Générale</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15.4/20</div>
                <p className="text-xs text-muted-foreground">+0.2 pts depuis la dernière période</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Classement</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3e/28</div>
                <p className="text-xs text-muted-foreground">Sur l'ensemble de la classe</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cours</CardTitle>
                <BookOpen className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Matières suivies</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                <Bell className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{notifications.length}</div>
                <p className="text-xs text-muted-foreground">Messages non lus</p>
              </CardContent>
            </Card>
          </div>

          {/* Section Événements à venir */}
          <Card className="mt-6">
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
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Mes Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Matière</TableHead>
                      <TableHead>Professeur</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Moyenne de classe</TableHead>
                      <TableHead>Rang</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((grade) => (
                      <TableRow key={grade.subject} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{grade.subject}</TableCell>
                        <TableCell>{grade.teacher}</TableCell>
                        <TableCell className="font-semibold">{grade.grade}/20</TableCell>
                        <TableCell>{grade.average}/20</TableCell>
                        <TableCell>{grade.rank}e</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Section Notifications */}
          <Card className="mt-6">
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
      </main>
    </div>
  );
};

export default StudentDashboard;