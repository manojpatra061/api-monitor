// -------------
// Database server needs to be running except for sqlite.
// -------------

console.log(".script.ts file running...", "\n");

import "dotenv/config";
import * as models from "../models/index.js";

async function runDbModel() {
  const result = await models.monitorModel.update("cmtoahjne00008fxvthf2vyzg", {isRunning: true});
  console.log({ result });
}

runDbModel();
