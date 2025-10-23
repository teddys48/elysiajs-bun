import Elysia from "elysia";
import * as service from "../service/auth.service";
import jwt from "@elysiajs/jwt";
import {
  loginRequestSchema,
  loginResponseSchema,
  registerRequestSchema,
  registerResponseSchema,
} from "../schema/auth.schema";
import { JWTRefreshMiddleware } from "../middleware/jwt.middleware";
import { buildResponse } from "../helper/helper";

export const authController = new Elysia().group("/api/auth", (data) =>
  data
    .post(
      "/register",
      async ({ body, set }) => {
        let res = await service.register(body);
        res.code == 0
          ? (set.status = 200)
          : res.code == 500
          ? (set.status = 500)
          : (set.status = 400);
        return res;
      },
      {
        tags: ["Auth"],
        body: registerRequestSchema,
        response: registerResponseSchema,
      }
    )
    .use(
      jwt({
        name: "accessToken",
        secret: "accessTokenSecret",
        exp: "1d",
      })
    )
    .use(
      jwt({
        name: "refreshToken",
        secret: "refreshTokenSecret",
        exp: "7d",
      })
    )
    .post(
      "/login",
      async ({ set, body, accessToken, refreshToken }) => {
        let res = await service.login(body, accessToken, refreshToken);
        res.code == 0
          ? (set.status = 200)
          : res.code == 500
          ? (set.status = 500)
          : (set.status = 400);
        return res;
      },
      {
        tags: ["Auth"],
        body: loginRequestSchema,
        response: loginResponseSchema,
      }
    )
    .derive(async ({ headers, refreshToken }) => {
      try {
        const getHeader = headers.authorization;
        if (!getHeader) {
          throw buildResponse(401, "token not found", {});
        }

        let token = getHeader.split(" ")[1];

        const verify = await refreshToken.verify(token);

        return { verify };
      } catch (error) {
        throw buildResponse(500, `${(error as Error).message}`, {});
      }
    })
    .get(
      "/refresh-token",
      async ({ set, accessToken, refreshToken, verify }) => {
        let res = await service.refreshToken(accessToken, refreshToken, verify);
        res.code == 0
          ? (set.status = 200)
          : res.code == 500
          ? (set.status = 500)
          : (set.status = 400);
        return res;
      },
      {
        tags: ["Auth"],
        body: loginRequestSchema,
        response: loginResponseSchema,
      }
    )
);
