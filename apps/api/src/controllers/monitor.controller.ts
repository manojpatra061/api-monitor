import { endpointService } from "../services/index.js";
import { z } from "zod";
import { ValidationError } from "@/errors/index.js";

export const MonitorSchema = z.object({
  userId: z.cuid2(),
  apiEndpoint: z.url(),
  intervalInSec: z.number(),
});

export async function addMonitor(monitorData: {
  userId: string;
  apiEndpoint: string;
  intervalInSec: number;
}) {
  try {
    const validatedData = MonitorSchema.parse(monitorData);
    const addedApiEndpoint =
      await endpointService.addApiEndpointForUser(validatedData);
    return addedApiEndpoint;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError({
        message: "Invalid entries",
        metadata: { zodError: z.prettifyError(error) },
      });
    }
  }
}
