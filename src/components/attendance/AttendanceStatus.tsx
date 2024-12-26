import { Check, X, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AttendanceStatusType = 'present' | 'absent' | 'late' | 'justified';

interface AttendanceStatusProps {
  status: AttendanceStatusType;
  className?: string;
}

export const AttendanceStatus = ({ status, className }: AttendanceStatusProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'present':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <X className="h-4 w-4 text-red-500" />;
      case 'late':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'justified':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'present':
        return 'Présent';
      case 'absent':
        return 'Absent';
      case 'late':
        return 'En retard';
      case 'justified':
        return 'Absence justifiée';
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {getStatusIcon()}
      <span className="text-sm">{getStatusText()}</span>
    </div>
  );
};