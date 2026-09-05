// -------------
// Database server needs to be running except for sqlite.
// -------------

console.log(".script.ts file running...", "\n");

import "dotenv/config";
import { monitorModel, apiEndpointModel, userModel } from "../models/index.js";

async function runDbModel() {
  // const newUser = await userModel.createUser({
  //   name: "manoj patra",
  //   email: "manojpatra@gmail.com",
  // });
  // console.log({ newUser });
  const model = await monitorModel.getMonitorWithApiEndpointId("i dont know");
  console.log({ model });
}

runDbModel();
