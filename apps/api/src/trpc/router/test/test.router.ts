import { createRouter } from "../../init-core.js";
import { testProcedures } from "./test.procedures.js";

export const testRouter = createRouter({
  ...testProcedures,
});
