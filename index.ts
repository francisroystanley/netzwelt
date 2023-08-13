import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

import redisClient from "./bin/redis";
import { port } from "./config/env";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json({ error: "404 - Page Not Found" });
});

app.listen(port, async () => {
  redisClient.on("error", err => console.error("Redis Client Error:", err));

  await redisClient.connect();

  console.log(`Server is running on port ${port}.`);
});
