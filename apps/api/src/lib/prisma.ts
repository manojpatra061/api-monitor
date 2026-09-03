// ----------
// Prisma client instance.
// ----------

// import "dotenv/config"; not needed - already there in index
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma-client/client.js";
export type {
  Monitor,
  MonitorHistory,
  User,
  ApiEndpoint,
} from "../generated/prisma-client/client.js";

const connectionString = `${process.env.TURSO_DATABASE_URL}`;

const adapter = new PrismaLibSql({
  url: connectionString,
});

export const prisma = new PrismaClient({ adapter });
