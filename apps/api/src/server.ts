import express from "express";
import { router } from "./routes/router.js";
import process from "node:process";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", router);

app.use(express.json());

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
