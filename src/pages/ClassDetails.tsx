import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClassDetails = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  // Fetch class details
  const { data: classDetails } = useQuery({
    queryKey: ["class", classId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", classId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Fetch students and their grades
  const { data: studentsWithGrades, isLoading } = useQuery({
    queryKey: ["class-students", classId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_classes")
        .select(`
          student:profiles!student_classes_student_id_fkey (
            id,
            first_name,
            last_name
          ),
          grades!inner (
            grade,
            teacher_classes (
              subject
            )
          )
        `)
        .eq("class_id", classId);

      if (error) throw error;

      // Process data to calculate averages and organize grades
      return data.map((item: any) => {
        const grades = item.grades.map((g: any) => ({
          subject: g.teacher_classes.subject,
          grade: g.grade,
          status: g.grade >= 10 ? "success" : "danger",
        }));

        const average =
          grades.reduce((acc: number, curr: any) => acc + curr.grade, 0) /
          grades.length;

        return {
          id: item.student.id,
          name: `${item.student.first_name} ${item.student.last_name}`,
          grades,
          average: average.toFixed(1),
          percentage: ((average / 20) * 100).toFixed(1),
        };
      });
    },
  });

  const handleStudentClick = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{classDetails?.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{classDetails?.description}</p>
        </CardContent>
      </Card>

      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Élève</TableHead>
              <TableHead>Moyenne</TableHead>
              <TableHead>Pourcentage</TableHead>
              <TableHead>Détails</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentsWithGrades?.map((student) => (
              <TableRow
                key={student.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleStudentClick(student.id)}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.average}/20</TableCell>
                <TableCell>{student.percentage}%</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {student.grades.map((grade: any, index: number) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          grade.status === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                        title={`${grade.subject}: ${grade.grade}/20`}
                      />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ClassDetails;