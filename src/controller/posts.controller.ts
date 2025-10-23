import Elysia, { t } from "elysia";
import * as service from "../service/posts.service";
import { buildResponse, generateRandomString } from "../helper/helper";
import {
  createPostSchema,
  findPostSchema,
  responseAllPosts,
  responseFindPosts,
  responsePosts,
} from "../schema/posts.schema";
import { LogMiddleware, testMiddleware } from "../middleware/log.middleware";
import { JWTMiddleware } from "../middleware/jwt.middleware";

export const postsController = new Elysia()
  .use(LogMiddleware)
  .use(JWTMiddleware)
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
          response: responseFindPosts,
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
          response: responsePosts,
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
          response: responsePosts,
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
          response: responsePosts,
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
