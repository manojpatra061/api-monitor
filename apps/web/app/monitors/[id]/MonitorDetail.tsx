"use client";

import { cn } from "@/lib/utils";
import { RecentEvents } from "./RecentEvents";
import { Chart } from "./Chart";
import { ActionButtons } from "./ActionButtons";
import { PageHeading } from "./PageHeading";
import { useQuery } from "@tanstack/react-query";
import { trpcClient } from "@/lib/trpcClient";

export function MonitorDetail({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ["monitor-detail", id],
    queryFn: async () => {
      return await trpcClient.test.hi.query();
    },
  });
  console.log({ data });

  return (
    <>
      <MonitorInfoSection />
      <PerformanceStatsSection />
      <ChartSection />
      <RecentEventsSection />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function MonitorInfoSection({ className }: { className?: string }) {
  return (
    <>
      <section
        className={cn(
          "mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between",
          className,
        )}
      >
        <PageHeading id={"1111"} />
        <ActionButtons />
      </section>
    </>
  );
}

function PerformanceStatsSection({ className }: { className?: string }) {
  const STAT_OPTIONS = [
    { label: "Uptime", unit: "%", value: "99.9" },
    { label: "Response time", unit: "ms", value: "352" },
    { label: "Total checks", unit: "", value: "1,234" },
  ];

  function Stat({
    value,
    unit,
    label,
  }: {
    value: string;
    unit: string;
    label: string;
  }) {
    return (
      <div className="border-r border-border/70 px-4 py-4 last:border-r-0 grow">
        <p className="font-mono text-2xl font-medium tracking-tight tabular-nums">
          {value}
          <span className="text-[13px] text-muted-foreground"> {unit}</span>
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
      </div>
    );
  }

  return (
    <>
      <section
        className={cn(
          "mb-7 flex overflow-hidden rounded border border-border",
          className,
        )}
      >
        {STAT_OPTIONS.map(({ label, unit, value }) => (
          <Stat
            key={`${label}-${unit}`}
            value={value}
            unit={unit}
            label={label}
          />
        ))}
      </section>
    </>
  );
}

function ChartSection({ className }: { className?: string }) {
  return (
    <>
      <section className={cn("mb-7 rounded border border-border", className)}>
        <Chart />
      </section>
    </>
  );
}

function RecentEventsSection({ className }: { className?: string }) {
  return (
    <>
      <section
        className={cn(
          "rounded border border-border",
          "px-4 py-3.5",
          "flex flex-col gap-3 items-stretch",
          className,
        )}
      >
        <RecentEvents />
      </section>
    </>
  );
}
