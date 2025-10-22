import Elysia, { t } from "elysia";
import * as service from "../service/posts.service";
import { buildResponse, generateRandomString } from "../helper/helper";
import {
  createPostSchema,
  findPostSchema,
  responseAllPosts,
} from "../schema/posts.schema";
import { LogMiddleware, testMiddleware } from "../middleware/log.middleware";

export const postsController = new Elysia()
  .use(LogMiddleware)
  .group("/api/post", (data) =>
    data
      .get(
        "/",
        async ({ set, request }) => {
          let res = await service.all(request);
          res.code == 0
            ? (set.status = 200)
            : res.code == 500
            ? (set.status = 500)
            : (set.status = 400);
          return res;
        },
        {
          response: responseAllPosts,
          tags: ["Posts"],
        }
      )
      .get(
        "/find",
        async ({ set, query }) => {
          console.log("object", query);
          let { id } = query;
          let res = await service.find(id);
          res.code == 0
            ? (set.status = 200)
            : res.code == 500
            ? (set.status = 500)
            : (set.status = 400);
          return res;
        },
        {
          tags: ["Posts"],
          query: findPostSchema,
        }
      )
      .post(
        "/create",
        async ({ set, body }) => {
          console.log("object", body);
          let res = await service.create(body);
          res.code == 0
            ? (set.status = 200)
            : res.code == 500
            ? (set.status = 500)
            : (set.status = 400);
          return res;
        },
        {
          body: createPostSchema,
          tags: ["Posts"],
        }
      )
      .post(
        "/update",
        async ({ set, query, body }) => {
          let { id } = query;
          let res = await service.update(id, body);
          res.code == 0
            ? (set.status = 200)
            : res.code == 500
            ? (set.status = 500)
            : (set.status = 400);
          return res;
        },
        {
          tags: ["Posts"],
          query: findPostSchema,
          body: createPostSchema,
        }
      )
      .get(
        "/delete",
        async ({ set, query }) => {
          let { id } = query;
          let res = await service.del(id);
          res.code == 0
            ? (set.status = 200)
            : res.code == 500
            ? (set.status = 500)
            : (set.status = 400);
          return res;
        },
        {
          tags: ["Posts"],
          query: findPostSchema,
        }
      )
      .onError(({ code, error, set }) => {
        console.log(error);
        set.status = 400;
        if (code == "VALIDATION") {
          return buildResponse(400, error.message, {});
        }
      })
  );
