import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, ChevronRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"

interface Class {
  id: string
  name: string
  description: string
  totalStudents: number
  girlsCount: number
  boysCount: number
  average: number
  girlsAverage: number
  boysAverage: number
}

export const GradesManagement = () => {
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      console.log("Fetching classes...")
      const { data: classes, error } = await supabase
        .from("classes")
        .select(`
          *,
          student_classes (
            student:profiles!student_classes_student_id_fkey (
              id
            )
          )
        `)
      
      if (error) {
        console.error("Error fetching classes:", error)
        throw error
      }

      return classes.map(c => ({
        ...c,
        totalStudents: c.student_classes.length,
        girlsCount: Math.floor(Math.random() * 15) + 10,
        boysCount: Math.floor(Math.random() * 15) + 10,
        average: Math.floor(Math.random() * 20) + 60,
        girlsAverage: Math.floor(Math.random() * 20) + 60,
        boysAverage: Math.floor(Math.random() * 20) + 60,
      }))
    },
  })

  const filteredClasses = classes?.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion des Points</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une classe..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select onValueChange={setSelectedClass} value={selectedClass || undefined}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par niveau" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eb">Éducation de Base</SelectItem>
              <SelectItem value="h">Humanités</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses?.map((classItem) => (
          <Card 
            key={classItem.id} 
            className="hover:bg-accent/5 transition-colors cursor-pointer"
            onClick={() => handleClassClick(classItem.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {classItem.name}
              </CardTitle>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Moyenne générale:</span>
                  <span className="font-medium">{classItem.average}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total élèves:</span>
                  <span className="font-medium">{classItem.totalStudents}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Filles</div>
                    <div className="font-medium">
                      {classItem.girlsCount} ({classItem.girlsAverage}%)
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Garçons</div>
                    <div className="font-medium">
                      {classItem.boysCount} ({classItem.boysAverage}%)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {classesLoading && (
        <div className="text-center text-muted-foreground">
          Chargement des classes...
        </div>
      )}

      {filteredClasses?.length === 0 && (
        <div className="text-center text-muted-foreground">
          Aucune classe trouvée
        </div>
      )}
    </div>
  )
}