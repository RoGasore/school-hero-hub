import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EvaluationParamsForm } from "./grades/EvaluationParamsForm";
import { GradesTable } from "./grades/GradesTable";
import { SubmissionDialog } from "./grades/SubmissionDialog";
import type { EvaluationParams, GradeEntry, GradeSubmissionData } from "@/types/grades";

export const GradeSubmission = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"params" | "grades">("params");
  const [params, setParams] = useState<EvaluationParams | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [submissionData, setSubmissionData] = useState<GradeSubmissionData | null>(null);

  const { data: students } = useQuery({
    queryKey: ["class-students", params?.classId],
    queryFn: async () => {
      if (!params?.classId) return null;

      const { data, error } = await supabase
        .from("student_classes")
        .select(`
          student:profiles!inner (
            id,
            first_name,
            last_name
          )
        `)
        .eq("class_id", params.classId);

      if (error) throw error;
      return data?.map(item => item.student) || [];
    },
    enabled: !!params?.classId,
  });

  const handleParamsSubmit = (evaluationParams: EvaluationParams) => {
    setParams(evaluationParams);
    setStep("grades");
  };

  const handleGradesSubmit = async (grades: GradeEntry[]) => {
    if (!params) return;

    const data: GradeSubmissionData = {
      params,
      grades,
    };

    setSubmissionData(data);
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmission = async () => {
    if (!submissionData || !params) return;

    try {
      const { error } = await supabase.from("grades").insert(
        submissionData.grades.map(grade => ({
          student_id: grade.studentId,
          grade: parseFloat(grade.grade),
          status: grade.status,
          weight: params.weight,
          period_id: params.periodId,
          evaluation_type_id: params.evaluationType,
          date_evaluated: params.date.toISOString(),
        }))
      );

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Les notes ont été enregistrées avec succès",
      });

      // Reset form
      setStep("params");
      setParams(null);
      setShowConfirmDialog(false);
      setSubmissionData(null);
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
      {step === "params" && (
        <EvaluationParamsForm onParamsSubmit={handleParamsSubmit} />
      )}

      {step === "grades" && students && params && (
        <GradesTable
          students={students}
          maxGrade={params.weight}
          onSubmit={handleGradesSubmit}
        />
      )}

      {showConfirmDialog && submissionData && (
        <SubmissionDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirmSubmission}
          data={submissionData}
        />
      )}
    </div>
  );
};