import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";

import redisClient from "./bin/redis";
import { port } from "./config/env";
import routes from "./routes";

const app = express();
const clientDistPath = path.join(process.cwd(), "client", "dist", "client");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.use("/", express.static(clientDistPath));

app.all("*", function (req, res) {
  res.status(200).sendFile("/", { root: clientDistPath });
});

app.listen(port, async () => {
  redisClient.on("error", err => console.error("Redis Client Error:", err));

  await redisClient.connect();

  console.log(`Server is running on port ${port}.`);
});
