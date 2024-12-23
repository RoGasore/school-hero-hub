import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Bell, Trophy, Calendar } from "lucide-react";

const StudentDashboard = () => {
  // Données simulées pour démonstration
  const grades = [
    { subject: "Mathématiques", grade: 15, average: 14.2, rank: 3 },
    { subject: "Français", grade: 16, average: 15.1, rank: 2 },
    { subject: "Histoire-Géo", grade: 14, average: 13.8, rank: 5 },
    { subject: "Sciences", grade: 17, average: 15.5, rank: 1 },
  ];

  const notifications = [
    { id: 1, message: "Devoir de mathématiques pour lundi prochain", date: "2024-02-15" },
    { id: 2, message: "Réunion parents-professeurs le 20 février", date: "2024-02-10" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl font-serif font-bold text-primary">
            Tableau de Bord Élève
          </h1>

          {/* Grid de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moyenne Générale</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15.4/20</div>
                <p className="text-xs text-muted-foreground">+0.2 pts depuis la dernière période</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Classement</CardTitle>
                <Trophy className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3e/28</div>
                <p className="text-xs text-muted-foreground">Sur l'ensemble de la classe</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cours</CardTitle>
                <BookOpen className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Matières suivies</p>
              </CardContent>
            </Card>

            <Card>
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

          {/* Section Notes */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Mes Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matière</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Moyenne de classe</TableHead>
                    <TableHead>Rang</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade) => (
                    <TableRow key={grade.subject}>
                      <TableCell className="font-medium">{grade.subject}</TableCell>
                      <TableCell>{grade.grade}/20</TableCell>
                      <TableCell>{grade.average}/20</TableCell>
                      <TableCell>{grade.rank}e</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Section Notifications */}
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Notifications</CardTitle>
              <Button variant="outline" size="sm">
                Tout marquer comme lu
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500">{notif.date}</p>
                      </div>
                    </div>
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