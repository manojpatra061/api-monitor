import { router } from "../../init.js";
import { testProcedures } from "./test.procedures.js";

export const testRouter = router({
  ...testProcedures
});
