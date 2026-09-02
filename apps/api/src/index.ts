import "dotenv/config";
import { startServer } from "./server.js";

export type { TrpcAppRouter } from "./trpc/index.js";

startServer();
