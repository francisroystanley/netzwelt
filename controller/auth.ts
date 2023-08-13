import axios from "axios";
import { Response } from "express";

import redisClient from "../bin/redis";
import { externalApi, nodeEnv, refreshTokenExpirySeconds } from "../config/env";
import { signToken } from "../middleware/jwt";

const login = async (req: LoginRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const { data: user } = await axios.post<User>(`${externalApi}/account/signin`, { username, password });

    const accessToken = signToken(user);
    const refreshToken = signToken(user, false);

    redisClient.set(refreshToken, JSON.stringify(user), { EX: refreshTokenExpirySeconds });

    updateTokenCookie(res, "accessToken", accessToken);
    updateTokenCookie(res, "refreshToken", refreshToken);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: (<ResponseError>err).response.data.message });
  }
};

const refreshAccessToken = async (req: RefreshTokenRequest, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided." });

    const user = await redisClient.get(refreshToken);

    if (!user) return res.status(403).json({ message: "Invalid refresh token." });

    const accessToken = signToken(JSON.parse(user));
    updateTokenCookie(res, "accessToken", accessToken);

    res.status(200);
  } catch (e) {
    res.status(403).json({ message: "Invalid refresh token." });
  }
};

const updateTokenCookie = (res: Response, key: string, value: string) => {
  res.cookie(key, value, { httpOnly: true, secure: nodeEnv === "production", sameSite: "strict" });
};

export { login, refreshAccessToken };
