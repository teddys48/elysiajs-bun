import Elysia, { t } from "elysia";
import * as service from "../service/posts.service";

export const postsController = new Elysia().group("/api", (data) =>
  data.get(
    "/post",
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
      tags: ["Posts"],
    }
  )
);
// "/post",
// async function ({ set, request }) {
//   let res = await service.all(request);
//   res.code == 0
//     ? (set.status = 200)
//     : res.code == 500
//     ? (set.status = 500)
//     : (set.status = 400);
//   return res;
// }
