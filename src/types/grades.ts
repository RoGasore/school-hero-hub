export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  matricula?: string;
}

export interface GradeEntry {
  studentId: string;
  grade: string;
  status: 'present' | 'absent';
}

export interface EvaluationParams {
  periodId: string;
  classId: string;
  evaluationType: string;
  weight: number;
  date: Date;
}

export interface GradeSubmissionData {
  params: EvaluationParams;
  grades: GradeEntry[];
}