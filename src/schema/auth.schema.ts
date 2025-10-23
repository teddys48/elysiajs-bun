import { t } from "elysia";

export const loginRequestSchema = t.Object({
  email: t.String({
    minLength: 1,
    error: "email is required",
    default: "test@gmail.com",
  }),
  password: t.String({
    minLength: 1,
    error: "password is required",
    default: "123",
  }),
});

export const loginResponseSchema = {
  200: t.Object({
    code: t.Number({
      default: 0,
    }),
    message: t.String({
      default: "success",
    }),
    data: t.Object({
      access_token: t.String(),
      refresh_token: t.String(),
    }),
  }),
  400: t.Object({
    code: t.Number({
      default: 400,
    }),
    message: t.String(),
    data: t.Object({}),
  }),
  500: t.Object({
    code: t.Number({
      default: 500,
    }),
    message: t.String(),
    data: t.Object({}),
  }),
};

export const registerRequestSchema = t.Object({
  name: t.String({
    minLength: 1,
    error: "email is required",
    default: "qwqw",
  }),
  email: t.String({
    minLength: 1,
    error: "email is required",
    default: "test@gmail.com",
  }),
  password: t.String({
    minLength: 1,
    error: "password is required",
    default: "123",
  }),
});

export const registerResponseSchema = {
  200: t.Object({
    code: t.Number({
      default: 0,
    }),
    message: t.String({
      default: "success",
    }),
    data: t.Object({}),
  }),
  400: t.Object({
    code: t.Number({
      default: 400,
    }),
    message: t.String(),
    data: t.Object({}),
  }),
  500: t.Object({
    code: t.Number({
      default: 500,
    }),
    message: t.String(),
    data: t.Object({}),
  }),
};
