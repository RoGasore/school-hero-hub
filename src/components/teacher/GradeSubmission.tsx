import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const GradeSubmission = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [weight, setWeight] = useState<string>("10");
  const [grades, setGrades] = useState<Record<string, string>>({});

  const { data: periods } = useQuery({
    queryKey: ["periods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("periods")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const { data: evaluationTypes } = useQuery({
    queryKey: ["evaluation-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("evaluation_types")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const { data: students } = useQuery({
    queryKey: ["class-students", selectedClass],
    queryFn: async () => {
      if (!selectedClass) return null;

      const { data, error } = await supabase
        .from("student_classes")
        .select(`
          student:profiles!inner (
            id,
            first_name,
            last_name
          )
        `)
        .eq("class_id", selectedClass);

      if (error) throw error;
      return data;
    },
    enabled: !!selectedClass,
  });

  const handleGradeChange = (studentId: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0 || numValue > 20) return;
    setGrades((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedPeriod || !selectedType) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      });
      return;
    }

    try {
      const gradesData = Object.entries(grades).map(([studentId, grade]) => ({
        student_id: studentId,
        grade: parseFloat(grade),
        period_id: selectedPeriod,
        evaluation_type_id: selectedType,
        weight: parseInt(weight),
      }));

      const { error } = await supabase.from("grades").insert(gradesData);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Les notes ont été enregistrées avec succès",
      });

      // Reset form
      setGrades({});
    } catch (error) {
      console.error("Error submitting grades:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement des notes",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Période</label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              {periods?.map((period) => (
                <SelectItem key={period.id} value={period.id}>
                  {period.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type d'évaluation</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              {evaluationTypes?.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Pondération</label>
          <Select value={weight} onValueChange={setWeight}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une pondération" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((w) => (
                <SelectItem key={w} value={w.toString()}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {students && students.length > 0 && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de l'élève</TableHead>
                <TableHead>Note (/20)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((item) => (
                <TableRow key={item.student.id}>
                  <TableCell>
                    {item.student.first_name} {item.student.last_name}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.5"
                      value={grades[item.student.id] || ""}
                      onChange={(e) =>
                        handleGradeChange(item.student.id, e.target.value)
                      }
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Button onClick={handleSubmit} className="w-full">
        Soumettre les notes
      </Button>
    </div>
  );
};