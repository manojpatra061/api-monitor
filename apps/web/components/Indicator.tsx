import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function StatusDot({ status }: { status: "healthy" | "down" | "slow" }) {
  return (
    <Skeleton
      className={cn(
        "w-2 aspect-square rounded-full",
        status === "healthy" && "bg-green-700",
        status === "down" && "bg-red-600",
        status === "slow" && "bg-yellow-500",
      )}
      aria-hidden="true"
    />
  );
}

interface Props {
  runningCount: number;
  downCount?: number;
  className?: string;
}

export function Indicator({ runningCount, downCount = 0, className }: Props) {
  const hasIncident = downCount > 0;

  return (
    <>
      <div className={cn("ml-auto flex items-center gap-3.5", className)}>
        <Badge
          variant="outline"
          className="gap-1.5 rounded-full px-2.5 py-1 font-normal text-muted-foreground"
        >
          <StatusDot status={hasIncident ? "down" : "healthy"} />
          {hasIncident ? `${downCount} down` : `${runningCount} running`}
        </Badge>
      </div>
    </>
  );
}
