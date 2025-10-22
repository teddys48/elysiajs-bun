import { t } from "elysia";

export const findPostSchema = t.Object({
  id: t.Any({
    maximum: 1,
    error: "query param id is required",
  }),
});

export const createPostSchema = t.Object({
  title: t.String({ minLength: 1, error: "title is required" }),
  content: t.String({
    minLength: 1,
    error: "content is required",
  }),
});

export const responseAllPosts = t.Object({
  code: t.Number({
    default: 0,
  }),
  message: t.String({
    default: "success",
  }),
  data: t.Array(
    t.Object({
      id: t.Numeric(),
      title: t.String(),
      content: t.String(),
      created_at: t.Nullable(t.Date()),
      updated_at: t.Nullable(t.Date()),
      code: t.Nullable(t.String()),
    })
  ),
});
