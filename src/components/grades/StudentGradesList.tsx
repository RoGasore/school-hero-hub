import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GradeStatusIndicator } from "./GradeStatusIndicator";

interface Grade {
  subject: string;
  grade: number;
  teacher: string;
}

interface StudentGradesListProps {
  grades: Grade[];
}

export const StudentGradesList = ({ grades }: StudentGradesListProps) => {
  const calculatePercentage = (grade: number) => (grade / 20) * 100;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matière</TableHead>
          <TableHead>Professeur</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {grades.map((grade, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{grade.subject}</TableCell>
            <TableCell>{grade.teacher}</TableCell>
            <TableCell>{grade.grade}/20</TableCell>
            <TableCell>
              <GradeStatusIndicator percentage={calculatePercentage(grade.grade)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};