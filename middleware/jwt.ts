import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { accessTokenExpiry, refreshSecretKey, refreshTokenExpiry, secretKey } from "../config/env";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    verifyToken<User>(token, secretKey);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

const signToken = (data: string | object | Buffer, isAccessToken = true) => {
  const key = isAccessToken ? secretKey : refreshSecretKey;
  const expiresIn = isAccessToken ? accessTokenExpiry : refreshTokenExpiry;

  return jwt.sign(data, key, { expiresIn });
};

const verifyToken = <T = string | JwtPayload>(token: string, key: jwt.Secret) => jwt.verify(token, key) as T;

export { authenticate, signToken };
