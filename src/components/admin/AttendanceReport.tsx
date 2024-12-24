import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth } from "date-fns";

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

    const { data, error } = await supabase
      .from('attendance')
      .select(`
        student:profiles(id, first_name, last_name),
        status
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

    // Process data to calculate statistics
    const studentStats: Record<string, AttendanceStats> = {};

    data.forEach(record => {
      const studentId = record.student.id;
      if (!studentStats[studentId]) {
        studentStats[studentId] = {
          studentId,
          studentName: `${record.student.first_name} ${record.student.last_name}`,
          present: 0,
          absent: 0,
          late: 0,
          total: 0,
          percentage: 0
        };
      }

      studentStats[studentId][record.status]++;
      studentStats[studentId].total++;
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