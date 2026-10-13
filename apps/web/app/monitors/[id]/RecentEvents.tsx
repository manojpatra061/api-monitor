export function RecentEvents() {
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
