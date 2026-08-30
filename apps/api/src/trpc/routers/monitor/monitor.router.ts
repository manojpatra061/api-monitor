import { router } from "../../init.js";
import { monitorProcedures } from "./monitor.procedures.js";

export const monitorRouter = router({
  ...monitorProcedures,
});
