import { DatabaseError, NotFoundError } from "@/errors/index.js";
import { prisma, type Monitor } from "@/lib/prisma.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

export type { Monitor } from "@/lib/prisma.js";
export type MonitorBase = Pick<
  Monitor,
  "apiEndpointId" | "isRunning" | "nextCheckAt" | "lastCheckedAt" | "method"
>;

/**
 * Get a monitor using api_endpoint_id
 *
 * @param apiEndpointId
 * @returns monitor
 * @throws DatabaseError
 */
export async function getWithApiEndpointId(
  apiEndpointId: string,
): Promise<Monitor> {
  try {
    const monitor = await prisma.monitor.findUnique({
      where: { apiEndpointId },
    });
    if (!monitor) {
      throw new NotFoundError(
        `No such monitor with "${apiEndpointId}" as its api_endpoint_id present.`,
      );
    }
    return monitor;
  } catch (error) {
    throw new DatabaseError({
      message: "Unable to fetch monitor",
      metadata: { query: "prisma.monitor.findUnique()" },
      opts: { cause: error },
    });
  }
}

/**
 * Create a monitor for an api-endpoint
 *
 * Note: A monitor can only be created if its api-endpoint details already exist in db.
 * @param apiEndpointId
 * @returns newly created monitor
 * @throws DatabaseError
 */
export async function create(apiEndpointId: string): Promise<Monitor> {
  try {
    const { intervalInSec } = await prisma.apiEndpoint.findFirstOrThrow({
      where: { id: { equals: apiEndpointId } },
    });
    const createdMonitor = await prisma.monitor.create({
      data: {
        nextCheckAt: dayjs().add(intervalInSec, "second").utc().format(),
        apiEndpoint: { connect: { id: apiEndpointId } },
      },
    });
    return createdMonitor;
  } catch (error) {
    throw new DatabaseError({
      message: "Unable to create a monitor.",
      metadata: { query: "prisma.monitor.create()" },
      opts: { cause: error },
    });
  }
}

/**
 * Update the monitor.
 *
 * @param apiEndpointId
 * @param change
 * @returns
 * @throws DatabaseError
 */
export async function update(
  apiEndpointId: MonitorBase["apiEndpointId"],
  change: Partial<Omit<MonitorBase, "apiEndpointId">>,
): Promise<MonitorBase> {
  try {
    const updatedMonitor = await prisma.monitor.update({
      where: { apiEndpointId },
      data: change,
    });
    return updatedMonitor;
  } catch (error) {
    throw new DatabaseError({
      message: "Unable to update the monitor",
      metadata: { query: "prisma.monitor.update()" },
      opts: { cause: error },
    });
  }
}
