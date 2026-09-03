import { addApiEndpointForUser } from "./src/data/models/apiendpoint.model.js";

async function invoke() {
  const r = await addApiEndpointForUser("123ABC", {
    endpoint: "api.example.com",
    intervalInSec: 5,
  });
  console.log(r);
}

invoke();
