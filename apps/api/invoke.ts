import { addApiEndpointForUser } from "./src/data/db/apiendpoint.db.js";

async function invoke() {
  const r = await addApiEndpointForUser("123ABC", {
    endpoint: "api.example.com",
    intervalInSec: 5,
  });
  console.log(r);
}

invoke();
