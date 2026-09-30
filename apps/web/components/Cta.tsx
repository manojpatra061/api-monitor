import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Props {
  className?: string;
}
export function AddMonitorCta({ className }: Props) {
  return (
    <>
      <Button
        variant={"outline"}
        className={cn(
          "cursor-pointer bg-primary hover:border-foreground hover:bg-primary",
          className,
        )}
      >
        <span>Add Monitor</span>
        <Plus />
      </Button>
    </>
  );
}
