import "dotenv/config";
import { prisma, Monitor, ApiEndpoint } from "@/lib/prisma.js";
import { monitorService } from "@/services/index.js";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { EngineError } from "./errors/index.js";

dayjs.extend(localizedFormat);

async function startEngine() {
  // findout due monitor every second -> returns an array of monitors
  while (true) {
    const dueMonitors = await findDueMonitor();
    // process the monitor -> returns the result array + update nextCheck
    console.log("---------------------------------");
    if (dueMonitors.length === 0) {
      console.log(`No due monitors found! - ${dayjs().format("L - LTS")}`);
      await delay(5000);
      continue;
    }
    const monitorResults = await processMonitor(dueMonitors);
    // save the result
    const { savedResults } = await saveResult(monitorResults);
    console.log(`Saved: ${savedResults} records.`);
    await delay(5000);
  }
}

type DueMonitor = {
  monitorId: Monitor["id"];
  intervalInSec: ApiEndpoint["intervalInSec"];
  url: ApiEndpoint["endpoint"];
};
async function findDueMonitor(): Promise<DueMonitor[]> {
  const dueMonitors = await prisma.monitor.findMany({
    where: {
      AND: [{ isRunning: true }, { nextCheckAt: { lte: dayjs().toDate() } }],
    },
    select: {
      id: true,
      apiEndpoint: { select: { intervalInSec: true, endpoint: true } },
    },
    take: 5,
  });
  return dueMonitors.map((dm) => {
    return {
      monitorId: dm.id,
      intervalInSec: dm.apiEndpoint.intervalInSec,
      url: dm.apiEndpoint.endpoint,
    };
  });
}

type MonitorResult = Awaited<ReturnType<typeof monitorService.hitUrl>> & {
  monitorId: Monitor["id"];
};
async function processMonitor(
  dueMonitors: DueMonitor[],
): Promise<MonitorResult[]> {
  let monitorResults: MonitorResult[] = [];
  dueMonitors.forEach(async (dm) => {
    let monitorResult = await monitorService.hitUrl(dm.url);
    // update nextCheck
    const t = await prisma.monitor.update({
      where: { id: dm.monitorId },
      data: {
        nextCheckAt: dayjs().add(dm.intervalInSec, "seconds").toDate(),
        lastCheckedAt: dayjs().toDate(),
      },
    });
    monitorResults.push({ ...monitorResult, monitorId: dm.monitorId });
  });
  return monitorResults;
}

async function saveResult(monitorResultArr: MonitorResult[]) {
  const { count } = await prisma.monitorResult.createMany({
    data: monitorResultArr,
  });
  return { savedResults: count };
}

// ---------- Helpers -----------

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

startEngine();
