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
