import { createRouter } from "../../init.js";
import { testProcedures } from "./test.procedures.js";

export const testRouter = createRouter({
  ...testProcedures,
});
