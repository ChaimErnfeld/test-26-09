import express from "express";
import beeperRoute from "./routes/beeper.js";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use("/api/beepers", beeperRoute);
app.listen(PORT, () => {
    console.log("server is on");
});
