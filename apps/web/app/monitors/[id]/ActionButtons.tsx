import { cn } from "@/lib/utils";
import { Pause, Pencil } from "lucide-react";

export function ActionButtons({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("flex shrink-0 gap-2", className)}>
        {["Edit", "Pause"].map((label) => (
          <button
            key={label}
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-sm border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {label === "Edit" && <Pencil className="size-3.5" />}
            {label === "Pause" && <Pause className="size-3.5" />}
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
