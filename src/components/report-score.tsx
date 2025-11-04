import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ReportScore({ score }: { score: number }) {
  const getScoreClass = () => {
    if (score < 50) {
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/50";
    }
    if (score < 90) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-900/50";
    }
    return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900/50";
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "inline-block text-center text-sm font-semibold w-14 py-1",
        getScoreClass()
      )}
    >
      {score}
    </Badge>
  );
}
