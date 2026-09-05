import { createRouter } from "../../init-core.js";
import { monitorProcedures } from "./monitor.procedures.js";

export const monitorRouter = createRouter({
  ...monitorProcedures,
});
