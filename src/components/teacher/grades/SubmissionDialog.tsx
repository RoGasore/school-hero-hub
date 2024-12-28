import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GradeSubmissionData } from "@/types/grades";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: GradeSubmissionData;
}

export const SubmissionDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  data 
}: Props) => {
  const totalGrades = data.grades.length;
  const presentStudents = data.grades.filter(g => g.status === 'present').length;
  const absentStudents = totalGrades - presentStudents;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer la soumission</DialogTitle>
          <DialogDescription>
            Veuillez vérifier les informations suivantes avant de soumettre les notes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Pondération</p>
              <p className="text-muted-foreground">{data.params.weight} points</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Date d'évaluation</p>
              <p className="text-muted-foreground">
                {new Date(data.params.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-medium">Résumé</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              <li>{totalGrades} élèves au total</li>
              <li>{presentStudents} notes saisies</li>
              <li>{absentStudents} élèves absents</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={onConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};