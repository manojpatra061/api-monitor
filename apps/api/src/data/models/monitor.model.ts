import { DatabaseError, NotFoundError } from "@/errors/index.js";
import { prisma, type Monitor } from "@/lib/prisma.js";

export type { Monitor } from "@/lib/prisma.js";

/**
 *
 * @param apiEndpointId
 * @returns monitor
 * @throws NotFoundError, DatabaseError
 */
export async function getMonitorWithApiEndpointId(
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
