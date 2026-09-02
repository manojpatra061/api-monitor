import dotenv from "dotenv";
import { resolve } from "node:path";

dotenv.config({
  path: resolve(import.meta.dirname, ".env.test"),
  override: true,
});
