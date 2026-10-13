import express from "express";
import { router } from "./routes/router.js";
import process from "node:process";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use("/", router);

app.use(express.json());

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(
      `Server is running at ${process.env.API_URL}
API endpoints are live at ${process.env.API_URL}/api`,
    );
  });
};
