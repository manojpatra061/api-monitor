import { cn } from "@/lib/utils";

export function PageHeading({
  className,
  id,
}: {
  className?: string;
  id: string;
}) {
  return (
    <>
      <div className={cn("min-w-0", className)}>
        <p className="mb-1.5 text-xs text-muted-foreground">Monitor #{id}</p>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="break-all font-mono text-xl font-medium tracking-tight sm:text-2xl">
            https://api.myshop.dev/v1/health/TODO_ENDPOINT
          </h1>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Checked every TODO_INTERVAL · expects 200 · created TODO_DATE
        </p>
      </div>
    </>
  );
}
