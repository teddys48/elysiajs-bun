import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { postsController } from "./controller/posts.controller";
import logixlysia from "logixlysia";
import cors from "@elysiajs/cors";
import { generateRandomString } from "./helper/helper";
import { authController } from "./controller/auth.controller";
import { configDotenv } from "dotenv";
// import { LogMiddleware } from "./middleware/log.middleware";

configDotenv();

const { port } = process.env;

const app = new Elysia()
  // .use(LogMiddleware())
  .use(cors())
  .use(
    logixlysia({
      config: {
        logRotation: {
          interval: "1d",
        },
        showStartupMessage: true,
        startupMessageFormat: "simple",
        timestamp: {
          translateTime: "yyyy-mm-dd HH:MM:ss.SSS",
        },
        logFilePath: "./logs/logs.log",
        ip: true,

        customLogFormat:
          "🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}",
      },
    })
  )
  .use(
    openapi({
      documentation: {
        tags: [
          {
            name: "Auth",
            description: "list all authentication",
          },
          {
            name: "Posts",
            description: "list all posts",
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        // security: [{}],
      },
    })
  )
  .use(postsController)
  .use(authController)
  .get("/", () => "Hello Elysia")
  .get("*", () => "what are you looking for?!")
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
