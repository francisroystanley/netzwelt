import { Request, Response } from "express";

declare global {
  type User = {
    username: string;
    displayName: string;
    roles: string[];
  };

  interface LoginRequest extends Request {
    body: {
      username: string;
      password: string;
    };
  }

  interface LoginResponseError extends Response {
    response: {
      data: {
        message: string;
      };
    };
  }

  interface RefreshTokenRequest extends Request {
    body: {
      refreshToken: string;
    };
  }
}
