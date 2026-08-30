import { prisma } from "@/lib/prisma.js";
import type { ApiEndpoint } from "./db.types.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);
import { DatabaseError } from "@/errors/index.js";

type ApiEndpointBase = Pick<
  ApiEndpoint,
  "endpoint" | "intervalInSec" | "userId"
>;

/**
 * _Note: Adding an API endpoint also adds a monitor with calculated values._
 *
 * @param userId
 * @param data apiendpoint, interval (sec)
 * @returns API endpoint record with monitor record added.
 */
export async function addApiEndpointForUser(
  userId: ApiEndpointBase["userId"],
  endpointData: Omit<ApiEndpointBase, "userId">,
) {
  try {
    const result = await prisma.apiEndpoint.create({
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
    return result;
  } catch {
    throw new DatabaseError(
      `Unable to add API endpoint for the user. 
        It could be due to if the user is trying to add the same API endpoint that is already present.`,
    );
  }
}
