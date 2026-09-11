import * as services from "../index.js";

async function run() {
  const t = await services.monitorService.hitUrl("https://dummyjson.com");
  console.log({ t });
}

run();
