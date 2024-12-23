import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Grade {
  subject: string;
  grade: number;
  average: number;
  rank: number;
  teacher: string;
}

interface GradesTableProps {
  grades: Grade[];
}

export const GradesTable = ({ grades }: GradesTableProps) => {
  return (
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
  );
};