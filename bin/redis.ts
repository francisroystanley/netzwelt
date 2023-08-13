import { createClient } from "redis";

import { redisHost, redisPort, redisPwd, redisUser } from "../config/env";

const redisClient = createClient({
  url: `redis://${redisUser}:${redisPwd}@${redisHost}:${redisPort}`
});

export default redisClient;
