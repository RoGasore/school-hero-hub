import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "warning" | "success";
  message: string;
  date: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    message: "Nouvel enseignant ajouté : Marie Dupont",
    date: "Il y a 2 heures",
  },
  {
    id: "2",
    type: "info",
    message: "Fin du trimestre dans 2 semaines",
    date: "Il y a 1 jour",
  },
  {
    id: "3",
    type: "warning",
    message: "5 élèves n'ont pas encore de notes en Mathématiques",
    date: "Il y a 2 jours",
  },
];

export const DashboardNotifications = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Notifications Importantes</CardTitle>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 rounded-lg border p-4"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};