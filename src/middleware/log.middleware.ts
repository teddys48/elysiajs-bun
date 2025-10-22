import Elysia from "elysia";

export const LogMiddleware = () =>
  new Elysia().onBeforeHandle(({ headers }) => {
    console.log("lewat");
  });

export const testMiddleware = () => {
  console.log("object");
};

export const JWTMiddleware = () =>
  new Elysia().onBeforeHandle(({ headers }) => {
    console.log("lewat", headers);
  });
