import { createRouter } from "../../init.js";
import { monitorProcedures } from "./monitor.procedures.js";

export const monitorRouter = createRouter({
  ...monitorProcedures,
});
