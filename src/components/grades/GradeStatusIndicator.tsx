import { cn } from "@/lib/utils";

interface GradeStatusIndicatorProps {
  percentage: number;
  showText?: boolean;
  className?: string;
}

export const GradeStatusIndicator = ({ percentage, showText = true, className }: GradeStatusIndicatorProps) => {
  const getStatusColor = (percentage: number) => {
    if (percentage >= 60) return "bg-green-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-3 h-3 rounded-full", getStatusColor(percentage))} />
      {showText && (
        <span className="text-sm font-medium">{percentage}%</span>
      )}
    </div>
  );
};