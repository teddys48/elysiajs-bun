import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { postsController } from "./controller/posts.controller";
import logixlysia from "logixlysia";
import cors from "@elysiajs/cors";
// import { LogMiddleware } from "./middleware/log.middleware";

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
            name: "Posts",
            description: "list all posts",
          },
          {
            name: "Auth",
            description: "list all authentication",
          },
        ],
        // security: [{}],
      },
    })
  )
  .use(postsController)
  .get("/", () => "Hello Elysia")
  .get("*", () => "what are you looking for?!")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
