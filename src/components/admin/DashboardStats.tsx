import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, School, Percent } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ReactNode
  trend?: {
    value: number
    label: string
  }
}

const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      {trend && (
        <div className="flex items-center gap-1 mt-2 text-xs">
          <span
            className={
              trend.value >= 0 ? "text-success" : "text-destructive"
            }
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-muted-foreground">{trend.label}</span>
        </div>
      )}
    </CardContent>
  </Card>
)

export const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Élèves"
        value="450"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="275 filles, 175 garçons"
        trend={{ value: 12, label: "depuis le dernier trimestre" }}
      />
      <StatsCard
        title="Moyenne Générale"
        value="68%"
        icon={<Percent className="h-4 w-4 text-muted-foreground" />}
        description="Toutes classes confondues"
        trend={{ value: 4, label: "depuis le dernier trimestre" }}
      />
      <StatsCard
        title="Total Classes"
        value="12"
        icon={<School className="h-4 w-4 text-muted-foreground" />}
        description="6 Éducation de base, 6 Humanités"
      />
      <StatsCard
        title="Taux de Réussite"
        value="78%"
        icon={<GraduationCap className="h-4 w-4 text-muted-foreground" />}
        description="Élèves avec moyenne > 60%"
        trend={{ value: -2, label: "depuis le dernier trimestre" }}
      />
    </div>
  )
}