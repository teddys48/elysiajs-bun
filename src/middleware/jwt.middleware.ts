import Elysia from "elysia";
import { buildResponse } from "../helper/helper";
import jwt from "@elysiajs/jwt";

export const JWTMiddleware = () =>
  new Elysia({ name: "auth" })
    .use(
      jwt({
        name: "access",
        secret: "accessTokenSecret",
      })
    )
    .derive(async ({ headers, access }) => {
      try {
        const getHeader = headers.authorization;
        if (!getHeader) {
          throw buildResponse(401, "token not found", {});
        }

        let token = getHeader.split(" ")[1];

        const verify = await access.verify(token);

        return { verify };
      } catch (error) {
        throw buildResponse(500, `${(error as Error).message}`, {});
      }
    });

export const JWTRefreshMiddleware = () =>
  new Elysia({ name: "auth" })
    .use(
      jwt({
        name: "refresh",
        secret: "refreshTokenSecret",
      })
    )
    .derive(async ({ headers, refresh }) => {
      try {
        const getHeader = headers.authorization;
        if (!getHeader) {
          throw buildResponse(401, "token not found", {});
        }

        let token = getHeader.split(" ")[1];

        const verify = await refresh.verify(token);

        return { verify };
      } catch (error) {
        throw buildResponse(500, `${(error as Error).message}`, {});
      }
    });
