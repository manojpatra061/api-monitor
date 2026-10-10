import { ArrowLeft, Pause, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

const responsePoints = [
  [0, 131],
  [15, 123],
  [30, 111],
  [45, 117],
  [60, 113],
  [75, 110],
  [90, 118],
  [105, 112],
  [120, 111],
  [135, 109],
  [149, 124],
  [164, 120],
  [179, 124],
  [194, 108],
  [209, 109],
  [224, 121],
  [239, 102],
  [254, 102],
  [269, 110],
  [283, 114],
  [298, 127],
  [313, 135],
  [328, 130],
  [343, 145],
  [358, 147],
  [373, 149],
  [388, 156],
  [403, 148],
  [418, 149],
  [433, 140],
  [448, 145],
  [462, 142],
  [477, 144],
  [492, 141],
  [507, 146],
  [522, 151],
  [537, 138],
  [552, 139],
  [567, 143],
  [582, 145],
  [597, 150],
  [612, 17],
  [626, 43],
  [641, 83],
  [656, 123],
  [671, 125],
  [686, 112],
  [701, 118],
  [716, 105],
  [731, 106],
  [746, 123],
  [761, 120],
  [776, 107],
  [791, 117],
  [805, 107],
  [820, 118],
  [835, 123],
  [850, 110],
  [865, 106],
  [880, 115],
];

const uptimeBars = Array.from({ length: 48 }, (_, index) => {
  if (index === 27) return "down";
  if (index === 26 || index === 28) return "slow";
  return "healthy";
});

const STAT_OPTIONS = [
  { value: "184", unit: "ms", label: "Latest response" },
  { value: "236", unit: "ms", label: "Average, 24 hours" },
  { value: "352", unit: "ms", label: "p95, 24 hours" },
  { value: "99.86", unit: "%", label: "Uptime, 24 hours" },
];

function pointsToString(points: number[][]) {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

function areaPath(points: number[][]) {
  const line = points.map(([x, y]) => `${x},${y}`).join(" L ");

  return `M ${line} L 880,200 L 0,200 Z`;
}

export default async function MonitorDetailPage({ params }: PageProps) {
  const { id } = await params;
  // const session = useSession();
  // const session = getSession();
  // console.log({ session });

  return (
    <>
      <section className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <PageHeading id={id} />
        <ActionButtons />
      </section>
      <section className="mb-6 grid grid-cols-2 overflow-hidden rounded border border-border sm:grid-cols-4">
        {STAT_OPTIONS.map(({ label, unit, value }) => (
          <Stat
            key={`${label}-${unit}`}
            value={value}
            unit={unit}
            label={label}
          />
        ))}
      </section>
      <section className="mb-7 overflow-hidden rounded border border-border">
        <Chart />
      </section>
      <section>
        <RecentEvents />
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

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
    <div className="border-r border-border/70 px-4 py-4 last:border-r-0">
      <p className="font-mono text-2xl font-medium tracking-tight tabular-nums">
        {value}
        <span className="text-[13px] text-muted-foreground"> {unit}</span>
      </p>

      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Event({
  time,
  title,
  description,
  detail,
}: {
  time: string;
  title: string;
  description: string;
  detail: string;
}) {
  return (
    <div className="grid gap-2 py-3.5 sm:grid-cols-[130px_minmax(0,1fr)_auto] sm:items-start sm:gap-3.5">
      <div className="font-mono text-xs text-muted-foreground">{time}</div>

      <div className="text-sm">
        <p className="font-semibold">{title}</p>

        <p className="mt-0.5 text-[13px] text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="font-mono text-xs text-muted-foreground">{detail}</div>
    </div>
  );
}

function ActionButtons({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("flex shrink-0 gap-2", className)}>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-sm border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Pencil className="size-3.5" />
          Edit
        </button>

        <button
          type="button"
          className="inline-flex h-9 items-center gap-2 rounded-sm border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Pause className="size-3.5" />
          Pause
        </button>
      </div>
    </>
  );
}

function PageHeading({ className, id }: { className?: string; id: string }) {
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

function RecentEvents() {
  return (
    <>
      <h2 className="mb-3.5 text-sm font-semibold">Recent events</h2>

      <div className="divide-y divide-border/70 border-t border-border/70">
        <Event
          time="Today 04:21"
          title="Recovered"
          description="Responded in 352 ms with 200."
          detail="2m 14s down"
        />

        <Event
          time="Today 04:19"
          title="Slow response"
          description="548 ms, over the 500 ms threshold. Alert sent to manoj@myshop.dev."
          detail="3 checks"
        />

        <Event
          time="12 Sep 09:02"
          title="Interval changed"
          description="From 5 minutes to 1 minute."
          detail="by you"
        />
      </div>
    </>
  );
}

function Chart() {
  return (
    <>
      {/* Chart header */}
      <div className="flex flex-col gap-3 border-b border-border/70 px-4 py-3.5 sm:flex-row sm:items-center">
        <h2 className="text-sm font-semibold">Response time</h2>

        <div className="flex overflow-hidden rounded-sm border border-border font-mono text-xs">
          <button
            type="button"
            className="border-r border-border px-3 py-1.5 text-muted-foreground"
          >
            1h
          </button>

          <button
            type="button"
            className="border-r border-border bg-muted px-3 py-1.5 text-foreground"
          >
            24h
          </button>

          <button
            type="button"
            className="border-r border-border px-3 py-1.5 text-muted-foreground"
          >
            7d
          </button>

          <button type="button" className="px-3 py-1.5 text-muted-foreground">
            30d
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground sm:ml-auto">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-3.5 bg-emerald-700" />
            Response time
          </span>

          <span className="inline-flex items-center gap-1.5">
            <span className="w-3.5 border-t-2 border-dashed border-amber-600" />
            Alert threshold 500 ms
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 pt-5">
        <div className="flex">
          {/* Y axis */}
          <div className="flex h-50 w-7 shrink-0 flex-col justify-between pb-0 font-mono text-[10px] text-muted-foreground">
            <span>600</span>
            <span>400</span>
            <span>200</span>
            <span>0</span>
          </div>

          <div className="relative min-w-0 flex-1">
            <svg
              viewBox="0 0 880 200"
              className="h-50 w-full overflow-visible"
              preserveAspectRatio="none"
              role="img"
              aria-label="Response time over the last 24 hours"
            >
              {/* Grid */}
              <line
                x1="0"
                y1="0"
                x2="880"
                y2="0"
                className="stroke-border/60"
              />

              <line
                x1="0"
                y1="66.7"
                x2="880"
                y2="66.7"
                className="stroke-border/60"
              />

              <line
                x1="0"
                y1="133.3"
                x2="880"
                y2="133.3"
                className="stroke-border/60"
              />

              <line
                x1="0"
                y1="200"
                x2="880"
                y2="200"
                className="stroke-border"
              />

              {/* 500ms threshold */}
              <line
                x1="0"
                y1="33.3"
                x2="880"
                y2="33.3"
                className="stroke-amber-600"
                strokeDasharray="4 4"
                strokeWidth="1"
                opacity="0.8"
              />

              {/* Area */}
              <path
                d={areaPath(responsePoints)}
                className="fill-emerald-700/10"
              />

              {/* Response line */}
              <polyline
                points={pointsToString(responsePoints)}
                fill="none"
                className="stroke-emerald-700"
                strokeWidth="1.7"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Hovered check */}
              <line
                x1="612"
                y1="0"
                x2="612"
                y2="200"
                className="stroke-foreground"
                strokeWidth="1"
                opacity="0.25"
              />

              <circle
                cx="612"
                cy="17"
                r="3.5"
                fill="white"
                className="stroke-red-600"
                strokeWidth="2"
              />

              {/* Tooltip */}
              <g transform="translate(625, 6)">
                <rect
                  width="146"
                  height="52"
                  rx="3"
                  className="fill-foreground"
                />

                <text
                  x="12"
                  y="21"
                  className="fill-background font-mono text-[12px]"
                >
                  548 ms · 200 OK
                </text>

                <text
                  x="12"
                  y="38"
                  className="fill-muted-foreground text-[11px]"
                >
                  04:20 · above threshold
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* X axis */}
        <div className="ml-7 flex justify-between pb-3 pt-1 font-mono text-[11px] text-muted-foreground">
          <span>18:00</span>
          <span>22:00</span>
          <span>02:00</span>
          <span>06:00</span>
          <span>10:00</span>
          <span>14:00</span>
          <span>now</span>
        </div>
      </div>

      {/* Uptime bars */}
      <div className="px-4 pb-5">
        <div className="mb-2 flex justify-between gap-4 text-xs text-muted-foreground">
          <span>Every check, oldest first</span>
          <span>1 failed · 2 slow · 1437 healthy</span>
        </div>

        <div className="flex h-6 gap-0.5">
          {uptimeBars.map((status, index) => (
            <span
              key={index}
              className={[
                "min-w-0 flex-1 rounded-[1px]",
                status === "down"
                  ? "bg-red-600"
                  : status === "slow"
                    ? "bg-amber-600"
                    : "bg-emerald-700 opacity-85",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </>
  );
}
