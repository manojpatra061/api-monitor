import "dotenv/config";
import { prisma, Monitor, ApiEndpoint } from "@/lib/prisma.js";
import { monitorService } from "@/services/index.js";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { EngineError } from "./errors/index.js";

dayjs.extend(localizedFormat);

async function startEngine(sec: number) {
  // every 5 second
  while (true) {
    console.log(`---------- ${dayjs().format("L - LTS")} ----------`);
    const dueMonitors = await findDueMonitors();
    console.log({ dueMonitorsLength: dueMonitors.length });

    // process the monitor -> returns the result array + update nextCheck
    if (dueMonitors.length === 0) {
      console.log(`No due monitors found!`);
      await delay(sec);
      continue;
    }
    const monitorResults = await processMonitor(dueMonitors);
    // save the result
    console.log({ monitorResults });

    const { savedResults } = await saveResult(monitorResults);
    console.log(`Saved: ${savedResults} records.`);
    await delay(sec);
  }
}

type DueMonitor = {
  monitorId: Monitor["id"];
  intervalInSec: ApiEndpoint["intervalInSec"];
  url: ApiEndpoint["endpoint"];
};
async function findDueMonitors(): Promise<DueMonitor[]> {
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
  return Promise.all(
    dueMonitors.map(async (dm) => {
      let monitorResult = await monitorService.hitUrl(dm.url);
      // update nextCheck
      await prisma.monitor.update({
        where: { id: dm.monitorId },
        data: {
          nextCheckAt: dayjs().add(dm.intervalInSec, "seconds").toDate(),
          lastCheckedAt: dayjs().toDate(),
        },
      });
      return { ...monitorResult, monitorId: dm.monitorId };
    }),
  );
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

startEngine(5000);
