"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type Monitor = {
  id: string;
  endpoint: string;
  status: "up" | "down" | "paused" | "pending";
  intervalInSec: number;
  responseTimeInMs: number | null;
  lastCheckedAt: string | null;
};

const demoMonitors: Monitor[] = [
  {
    id: "1",
    endpoint: "https://api.example.com/health",
    status: "up",
    intervalInSec: 60,
    responseTimeInMs: 124,
    lastCheckedAt: "2026-10-13T10:15:00Z",
  },
  {
    id: "2",
    endpoint: "https://example.com/api/users",
    status: "down",
    intervalInSec: 30,
    responseTimeInMs: null,
    lastCheckedAt: "2026-10-13T10:14:00Z",
  },
  {
    id: "3",
    endpoint: "https://example.org/status",
    status: "paused",
    intervalInSec: 300,
    responseTimeInMs: 89,
    lastCheckedAt: "2026-10-12T15:00:00Z",
  },
  {
    id: "4",
    endpoint: "https://service.example.net/ping",
    status: "pending",
    intervalInSec: 120,
    responseTimeInMs: null,
    lastCheckedAt: null,
  },
  {
    id: "4",
    endpoint: "https://service.example.net/ping",
    status: "pending",
    intervalInSec: 120,
    responseTimeInMs: null,
    lastCheckedAt: null,
  },
  {
    id: "4",
    endpoint: "https://service.example.net/ping",
    status: "pending",
    intervalInSec: 120,
    responseTimeInMs: null,
    lastCheckedAt: null,
  },
];

const statusClasses: Record<Monitor["status"], string> = {
  up: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  down: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
  paused:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  pending: "border-border bg-muted text-muted-foreground",
};

function formatInterval(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds % 3600 === 0) return `${seconds / 3600}h`;
  if (seconds % 60 === 0) return `${seconds / 60}m`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function formatLastChecked(value: string | null) {
  if (!value) return "Never";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function MonitorsTable({
  monitors = demoMonitors,
  onTogglePause,
  onDelete,
}: {
  monitors?: Monitor[];
  onTogglePause?: (monitor: Monitor) => void;
  onDelete?: (monitor: Monitor) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      monitors.filter((monitor) =>
        monitor.endpoint.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [monitors, search],
  );

  return (
    <section className={cn("space-y-5 bg-card border", "")}>
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-medium">
          All monitors{" "}
          <span className="ml-1 text-muted-foreground">
            ({monitors.length})
          </span>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search monitors"
            placeholder="Search endpoints..."
            className="pl-9"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-60">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Endpoint</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>Response time</TableHead>
              <TableHead>Last checked</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-36 text-center text-muted-foreground"
                >
                  {monitors.length === 0
                    ? "No monitors yet. Add your first monitor to get started."
                    : "No matching monitors found."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((monitor) => (
                <TableRow key={monitor.id}>
                  <TableCell className="max-w-64 font-medium sm:max-w-80">
                    <Link
                      href={`/monitors/${monitor.id}`}
                      className="group inline-flex max-w-full items-center gap-1.5 hover:text-primary"
                    >
                      <span className="truncate">{monitor.endpoint}</span>
                      <ArrowUpRight className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize ${statusClasses[monitor.status]}`}
                    >
                      {monitor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatInterval(monitor.intervalInSec)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {monitor.responseTimeInMs == null
                      ? "—"
                      : `${monitor.responseTimeInMs} ms`}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatLastChecked(monitor.lastCheckedAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${monitor.endpoint}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/monitors/${monitor.id}`}>
                            <ArrowUpRight className="mr-2 size-4" />
                            View details
                          </Link>
                        </DropdownMenuItem>
                        {onTogglePause && (
                          <DropdownMenuItem
                            onSelect={() => onTogglePause(monitor)}
                          >
                            {monitor.status === "paused" ? (
                              <Play className="mr-2 size-4" />
                            ) : (
                              <Pause className="mr-2 size-4" />
                            )}
                            {monitor.status === "paused" ? "Resume" : "Pause"}
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => onDelete(monitor)}
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <ScrollBar />
      </ScrollArea>
    </section>
  );
}
