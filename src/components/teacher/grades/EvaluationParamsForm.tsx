import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EvaluationParams } from "@/types/grades";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  onParamsSubmit: (params: EvaluationParams) => void;
}

export const EvaluationParamsForm = ({ onParamsSubmit }: Props) => {
  const [periodId, setPeriodId] = useState<string>("");
  const [classId, setClassId] = useState<string>("");
  const [evaluationType, setEvaluationType] = useState<string>("");
  const [weight, setWeight] = useState<number>(10);
  const [date, setDate] = useState<Date>(new Date());

  const { data: periods } = useQuery({
    queryKey: ["periods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("periods")
        .select("*")
        .order("start_date");
      if (error) throw error;
      return data;
    },
  });

  const { data: classes } = useQuery({
    queryKey: ["teacher-classes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("teacher_classes")
        .select(`
          id,
          subject,
          classes (
            id,
            name
          )
        `)
        .eq("teacher_id", "user-id"); // TODO: Replace with actual user ID
      if (error) throw error;
      return data;
    },
  });

  const { data: evaluationTypes } = useQuery({
    queryKey: ["evaluation-types"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("evaluation_types")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = () => {
    onParamsSubmit({
      periodId,
      classId,
      evaluationType,
      weight,
      date,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Période</label>
          <Select value={periodId} onValueChange={setPeriodId}>
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
          <label className="text-sm font-medium">Classe</label>
          <Select value={classId} onValueChange={setClassId}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une classe" />
            </SelectTrigger>
            <SelectContent>
              {classes?.map((teacherClass) => (
                <SelectItem 
                  key={teacherClass.classes.id} 
                  value={teacherClass.classes.id}
                >
                  {teacherClass.classes.name} - {teacherClass.subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Type d'évaluation</label>
          <Select value={evaluationType} onValueChange={setEvaluationType}>
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
          <Select 
            value={weight.toString()} 
            onValueChange={(v) => setWeight(parseInt(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une pondération" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 25, 30].map((w) => (
                <SelectItem key={w} value={w.toString()}>
                  {w}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date de l'évaluation</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={!periodId || !classId || !evaluationType}
        className="w-full"
      >
        Continuer
      </Button>
    </div>
  );
};