"use client"; // todo: del
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { CartesianGrid, Line, LineChart } from "recharts";

export default function HomePage() {
  return (
    <>
      <div
        className={cn(
          "grid gap-5 lg:gap-10 grid-cols-1 lg:grid-cols-5",
          "w-full",
        )}
      >
        <div className="lg:col-span-3 flex flex-col gap-5 lg:gap-10">
          <h1 className="lg:max-w-4/5 lg:text-5xl! text-shadow-xs">
            Know the second your endpoint stops answering.
          </h1>
          <p
            className={cn("lg:max-w-3/4", "text-brand-primary-fg lg:text-xl!")}
          >
            Give ApiMonitor a URL and how often to knock on it. It records every
            response time and tells you when one goes missing.
          </p>
          <StartMonitoringCard className="" />
        </div>
        <div className="lg:col-span-2">
          <FakeResultCard />
        </div>
      </div>
    </>
  );
}

function StartMonitoringCard({ className }: { className?: string }) {
  return (
    <>
      <Card className={cn("h-fit w-full", className)}>
        <CardContent>
          <form className="flex flex-col gap-5 lg:gap-10">
            <div className="flex flex-col gap-2.5">
              <Label className="font-semibold text-base lg:text-lg">
                Endpoint
              </Label>
              <div className="relative">
                <span className="absolute top-0.5 bottom-0.5 left-0.5 font-light text-base cursor-default bg-brand-secondary text-brand-secondary-fg p-2 rounded-xs">
                  GET
                </span>
                <Input type="url" className="pl-14 text-lg! font-thin h-12" />
              </div>
              <p className="font-light leading-normal! text-brand-primary-fg">
                Full URL including the scheme. Private endpoints can carry a
                header — set that after you save.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="font-semibold text-base lg:text-lg">
                Check every
              </Label>
              <RadioGroup defaultValue={"1min"} className={"flex flex-row "}>
                {[
                  { id: "10s", label: "10 sec", value: "10sec" },
                  { id: "30s", label: "30 sec", value: "30sec" },
                  { id: "1m", label: "1 min", value: "1min" },
                  { id: "5m", label: "5 min", value: "5min" },
                  { id: "15m", label: "15 min", value: "15min" },
                  { id: "1h", label: "1 hr", value: "1hr" },
                ].map(({ id, label, value }) => (
                  <FieldLabel
                    key={id}
                    htmlFor={id}
                    className="cursor-pointer lg:py-3.5 font-light"
                  >
                    <Field className="w-fit">
                      <FieldTitle className="lg:text-lg">{label}</FieldTitle>
                      <RadioGroupItem
                        className={"peer sr-only absolute"}
                        value={value}
                        id={id}
                      />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
              <p className="font-light leading-normal! text-brand-primary-fg">
                Faster checks catch shorter outages and use more of your monthly
                quota.
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2">
          <Button
            type="submit"
            className={
              "bg-brand-accent text-brand-accent-fg py-5 cursor-pointer h-12"
            }
          >
            <span className="font-bold text-lg uppercase">
              Start monitoring...
            </span>
          </Button>
          <p className="font-thin text-sm! text-center text-brand-primary-fg">
            First check runs immediately.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

function FakeResultCard({ className }: { className?: string }) {
  return (
    <>
      <Card className={cn("h-fit w-full", className)}>
        <CardHeader className="flex flex-row justify-between border-b">
          {/* Test response       dot 200 OK */}
          <CardTitle className="text-base">Test response</CardTitle>
          <div className="flex flex-row items-center gap-2">
            {/* <Dot size={50} className="bg-amber-300"/> */}
            <Circle
              size={10}
              className="rounded-full text-green-700 bg-green-700"
            />
            <span className="text-sm font-light">200 OK</span>
          </div>
        </CardHeader>
        <CardContent>
          {/* 184ms            just now */}
          <div className="flex flex-row justify-between text-sm">
            <span>
              <span className="font-bold text-2xl">184</span>
              <span className="font-thin!">ms</span>
            </span>
            <span className="font-thin!">just now</span>
          </div>
          <CardDescription>
            <span className="text-xs! font-thin!">
              Baseline for this endpoint. Alerts fire when a check fails twice
              in a row.
            </span>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <FakeChart />
        </CardFooter>
      </Card>
    </>
  );
}

function FakeChart({ className }: { className?: string }) {
  const chartData = [
    { responseTime: 100 },
    { responseTime: 200 },
    { responseTime: 50 },
    { responseTime: 400 },
    { responseTime: 50 },
    { responseTime: 100 },
    { responseTime: 50 },
  ];
  const chartConfig = {
    checks: {
      label: "Checks",
      // color: "#F90404",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className={cn("max-h-36 w-full", className)}
      >
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <Line
            type={"natural"}
            dataKey="responseTime"
            strokeWidth={2}
            stroke="var(--color-brand-accent)"
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
}
