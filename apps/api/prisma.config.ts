import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/data/schemas",
  migrations: {
    path: "src/data/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
