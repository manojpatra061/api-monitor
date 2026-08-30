import * as endPointService from "@/services/endpoint.service.js";
import { z } from "zod";
import { attempt } from "es-toolkit";
import { ValidationError } from "@/errors/index.js";

export const MonitorSchema = z.object({
  userId: z.cuid2(),
  apiEndpoint: z.url(),
  intervalInSec: z.number(),
});

export const addMonitor = async (monitorData: {
  userId: string;
  apiEndpoint: string;
  intervalInSec: number;
}) => {
  const [error, validatedData] = attempt<
    ReturnType<typeof MonitorSchema.parse>,
    z.ZodError
  >(() => MonitorSchema.parse(monitorData));

  if (error) {
    throw new ValidationError(z.prettifyError(error));
  }

  const addedApiEndpoint =
    await endPointService.addApiEndpointForUser(validatedData);

  return addedApiEndpoint;
};
