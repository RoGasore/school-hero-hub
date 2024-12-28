import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Student, GradeEntry } from "@/types/grades";
import { useToast } from "@/hooks/use-toast";

interface Props {
  students: Student[];
  maxGrade: number;
  onSubmit: (grades: GradeEntry[]) => void;
}

export const GradesTable = ({ students, maxGrade, onSubmit }: Props) => {
  const { toast } = useToast();
  const [grades, setGrades] = useState<Record<string, GradeEntry>>({});
  const [stats, setStats] = useState({
    average: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Calculate stats when grades change
    const entries = Object.values(grades);
    if (entries.length === 0) return;

    const presentEntries = entries.filter(e => e.status === 'present');
    const sum = presentEntries.reduce((acc, curr) => acc + parseFloat(curr.grade || "0"), 0);
    const avg = sum / (presentEntries.length || 1);
    const success = presentEntries.filter(e => parseFloat(e.grade) >= maxGrade * 0.5).length;
    const rate = (success / (presentEntries.length || 1)) * 100;

    setStats({
      average: avg,
      successRate: rate,
    });
  }, [grades, maxGrade]);

  const handleGradeChange = (studentId: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > maxGrade) {
      toast({
        title: "Note invalide",
        description: `La note doit être comprise entre 0 et ${maxGrade}`,
        variant: "destructive",
      });
      return;
    }

    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        grade: value,
        status: prev[studentId]?.status || 'present',
      },
    }));
  };

  const handleStatusChange = (studentId: string, checked: boolean) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        studentId,
        grade: checked ? "0" : (prev[studentId]?.grade || "0"),
        status: checked ? 'absent' : 'present',
      },
    }));
  };

  const handleSubmit = () => {
    const gradeEntries = students.map(student => ({
      studentId: student.id,
      grade: grades[student.id]?.grade || "0",
      status: grades[student.id]?.status || 'present',
    }));

    onSubmit(gradeEntries);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom de l'élève</TableHead>
              <TableHead>Matricule</TableHead>
              <TableHead>Absent</TableHead>
              <TableHead>Note /{maxGrade}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  {student.first_name} {student.last_name}
                </TableCell>
                <TableCell>{student.matricula || "-"}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={grades[student.id]?.status === 'absent'}
                    onCheckedChange={(checked) => 
                      handleStatusChange(student.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="0"
                    max={maxGrade}
                    step="0.5"
                    value={grades[student.id]?.grade || ""}
                    onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    disabled={grades[student.id]?.status === 'absent'}
                    className="w-24"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Moyenne de la classe: {stats.average.toFixed(2)} /{maxGrade}
        </div>
        <div>
          Taux de réussite: {stats.successRate.toFixed(1)}%
        </div>
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Soumettre les notes
      </Button>
    </div>
  );
};