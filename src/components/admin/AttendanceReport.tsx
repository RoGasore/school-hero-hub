import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Attendance = Database["public"]["Tables"]["attendance"]["Row"];

interface AttendanceWithStudent extends Attendance {
  student: {
    id: string;
    first_name: string | null;
    last_name: string | null;
  };
}

interface AttendanceStats {
  studentId: string;
  studentName: string;
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}

export const AttendanceReport = () => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [stats, setStats] = useState<AttendanceStats[]>([]);
  const { toast } = useToast();

  const generateReport = async () => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);

    console.log('Generating report for class:', selectedClass, 'from:', format(start, 'yyyy-MM-dd'), 'to:', format(end, 'yyyy-MM-dd'));

    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        student:profiles!attendance_student_id_fkey (
          id,
          first_name,
          last_name
        )
      `)
      .eq('class_id', selectedClass)
      .gte('date', format(start, 'yyyy-MM-dd'))
      .lte('date', format(end, 'yyyy-MM-dd'));

    if (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le rapport",
        variant: "destructive",
      });
      return;
    }

    console.log('Report data:', data);

    // Process data to calculate statistics
    const studentStats: Record<string, AttendanceStats> = {};

    (data as AttendanceWithStudent[]).forEach(record => {
      if (!record.student) return;
      
      const studentId = record.student.id;
      if (!studentStats[studentId]) {
        studentStats[studentId] = {
          studentId,
          studentName: `${record.student.first_name || ''} ${record.student.last_name || ''}`.trim(),
          present: 0,
          absent: 0,
          late: 0,
          total: 0,
          percentage: 0
        };
      }

      if (record.status) {
        studentStats[studentId][record.status as 'present' | 'absent' | 'late']++;
        studentStats[studentId].total++;
      }
    });

    // Calculate percentages
    Object.values(studentStats).forEach(stat => {
      stat.percentage = (stat.present / stat.total) * 100;
    });

    setStats(Object.values(studentStats));
  };

  const downloadPDF = () => {
    // Implement PDF generation and download
    toast({
      title: "Information",
      description: "La génération de PDF sera bientôt disponible",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rapport de Présence Mensuel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sélectionner une classe" />
            </SelectTrigger>
            <SelectContent>
              {/* Add class options */}
            </SelectContent>
          </Select>

          <Button onClick={generateReport}>
            Générer le rapport
          </Button>

          <Button variant="outline" onClick={downloadPDF}>
            Télécharger en PDF
          </Button>
        </div>

        {stats.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élève</TableHead>
                <TableHead>Présences</TableHead>
                <TableHead>Absences</TableHead>
                <TableHead>Retards</TableHead>
                <TableHead>Taux de présence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.map((stat) => (
                <TableRow key={stat.studentId}>
                  <TableCell>{stat.studentName}</TableCell>
                  <TableCell>{stat.present}</TableCell>
                  <TableCell>{stat.absent}</TableCell>
                  <TableCell>{stat.late}</TableCell>
                  <TableCell>{stat.percentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};