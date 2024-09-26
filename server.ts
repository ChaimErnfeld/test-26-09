import express, { Application } from "express";
import beeperRoute from "./routes/beeper.js";

const PORT: number = 3000;
const app: Application = express();

app.use(express.json());

app.use("/api/beepers", beeperRoute);

app.listen(PORT, () => {
  console.log("server is on");
});
