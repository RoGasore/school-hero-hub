import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Check, X, Clock, AlertCircle } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Class = Database["public"]["Tables"]["classes"]["Row"];

interface Student extends Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified';

export const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    console.log("Fetching classes...");
    const { data, error } = await supabase
      .from('classes')
      .select('*');
    
    if (error) {
      console.error('Error fetching classes:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les classes",
        variant: "destructive",
      });
      return;
    }

    setClasses(data);
  };

  const fetchStudents = async (classId: string) => {
    console.log("Fetching students for class:", classId);
    const { data, error } = await supabase
      .from('student_classes')
      .select(`
        student:profiles!student_classes_student_id_fkey (
          id,
          first_name,
          last_name
        )
      `)
      .eq('class_id', classId);
    
    if (error) {
      console.error('Error fetching students:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les élèves",
        variant: "destructive",
      });
      return;
    }

    const students = data
      .map(d => d.student)
      .filter((student): student is Student => student !== null);
    setStudents(students);

    // Fetch existing attendance for this date and class
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const { data: existingAttendance, error: attendanceError } = await supabase
      .from('attendance')
      .select('*')
      .eq('class_id', classId)
      .eq('date', formattedDate);

    if (attendanceError) {
      console.error('Error fetching attendance:', attendanceError);
      return;
    }

    // Set existing attendance
    const attendanceMap: Record<string, AttendanceStatus> = {};
    existingAttendance?.forEach(record => {
      if (record.student_id && record.status) {
        attendanceMap[record.student_id] = record.status as AttendanceStatus;
      }
    });
    setAttendance(attendanceMap);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    fetchStudents(value);
  };

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <X className="h-4 w-4 text-red-500" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'justified':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const saveAttendance = async () => {
    const user = await supabase.auth.getUser();
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    
    // First, delete existing attendance records for this date and class
    const { error: deleteError } = await supabase
      .from('attendance')
      .delete()
      .eq('class_id', selectedClass)
      .eq('date', formattedDate);

    if (deleteError) {
      console.error('Error deleting existing attendance:', deleteError);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les présences",
        variant: "destructive",
      });
      return;
    }

    // Then insert new attendance records
    const attendanceRecords = Object.entries(attendance).map(([studentId, status]) => ({
      student_id: studentId,
      class_id: selectedClass,
      date: formattedDate,
      status,
      created_by: user.data.user?.id
    }));

    const { error } = await supabase
      .from('attendance')
      .insert(attendanceRecords);

    if (error) {
      console.error('Error saving attendance:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les présences",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Succès",
      description: "Les présences ont été enregistrées",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Présences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-[350px]">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>
            <div className="flex-1">
              <Select value={selectedClass} onValueChange={handleClassChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedClass && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[100px]">Indicateur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.last_name}</TableCell>
                      <TableCell>{student.first_name}</TableCell>
                      <TableCell>
                        <Select
                          value={attendance[student.id] || 'present'}
                          onValueChange={(value) => handleAttendanceChange(student.id, value as AttendanceStatus)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Présent</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Retard</SelectItem>
                            <SelectItem value="justified">Absence justifiée</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {getStatusIcon(attendance[student.id] || 'present')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-end">
                <Button onClick={saveAttendance}>
                  Enregistrer les présences
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};