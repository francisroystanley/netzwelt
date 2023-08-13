const {
  EXTERNAL_API: externalApi,
  NODE_ENV: nodeEnv = "development",
  PORT: port = 8080,
  REDIS_HOST: redisHost,
  REDIS_PORT: redisPort,
  REDIS_PWD: redisPwd,
  REDIS_USER: redisUser,
  REFRESH_SECRET_KEY: refreshSecretKey = "my-super-duper-very-long-refresh-secret-key",
  SECRET_KEY: secretKey = "my-super-duper-very-long-secret-key"
} = process.env;
const accessTokenExpiry = "15m";
const refreshTokenExpiry = "1d";
const refreshTokenExpirySeconds = 604800;

export {
  accessTokenExpiry,
  externalApi,
  nodeEnv,
  port,
  redisHost,
  redisPort,
  redisPwd,
  redisUser,
  refreshSecretKey,
  refreshTokenExpiry,
  refreshTokenExpirySeconds,
  secretKey
};
