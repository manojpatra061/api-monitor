// -------------
// Database server needs to be running except for sqlite.
// -------------

import "dotenv/config";
import { monitorModel, apiEndpointModel, userModel } from "../index.js";

async function runModel() {
  // const newUser = await userModel.createUser({
  //   name: "manoj patra",
  //   email: "manojpatra@gmail.com",
  // });
  // console.log({ newUser });
  const model = await monitorModel.getMonitorWithApiEndpointId("i dont know");
  console.log({ model });
}

runModel();
