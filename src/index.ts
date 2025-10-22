import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { postsController } from "./controller/posts.controller";

const app = new Elysia()
  .use(
    openapi({
      documentation: {
        tags: [
          {
            name: "Posts",
            description: "list all posts",
          },
        ],
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
