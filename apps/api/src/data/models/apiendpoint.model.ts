import { prisma } from "@/lib/prisma.js";
import type { ApiEndpoint, Monitor } from "@/lib/prisma.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);
import { DatabaseError } from "@/errors/index.js";

export type { ApiEndpoint } from "@/lib/prisma.js";

export type ApiEndpointBase = Pick<
  ApiEndpoint,
  "endpoint" | "intervalInSec" | "userId"
>;

/**
 * Note: Adding an API endpoint also adds a monitor with calculated values.
 *
 * @param userId
 * @param data apiendpoint, interval (sec)
 * @returns API endpoint record with monitor record added.
 * @throws DatabaseError
 */
export async function addApiEndpointForUser(
  userId: ApiEndpointBase["userId"],
  endpointData: Omit<ApiEndpointBase, "userId">,
): Promise<{ apiEndpoint: ApiEndpoint; monitor: Monitor | null }> {
  try {
    const { monitor, ...apiEndpoint } = await prisma.apiEndpoint.create({
      data: {
        ...endpointData,
        monitor: { create: { nextCheckAt: dayjs().utc().format() } },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        monitor: true,
      },
    });
    if (!monitor) {
      return { apiEndpoint, monitor: null };
    }
    return { apiEndpoint, monitor };
  } catch (error) {
    throw new DatabaseError({
      message: "Unable to add API endpoint for the user.",
      metadata: { query: "prisma.apiEndpoint.create" },
      opts: { cause: error },
    });
  }
}
