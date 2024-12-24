import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, School } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description?: string;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Enseignants"
        value={24}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Élèves"
        value={450}
        icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Classes"
        value={12}
        icon={<School className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Total Matières"
        value={8}
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};