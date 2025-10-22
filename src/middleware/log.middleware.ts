import Elysia from "elysia";
import { generateRandomString } from "../helper/helper";

export const LogMiddleware = () =>
  new Elysia()
    .derive(async ({ request, path, store }) => {
      const body = await request.json().catch(() => null);
      console.log(`[REQ] ${path} → body:`, body);
      return {
        session_id: generateRandomString(),
      };
    })
    .onAfterHandle(async ({ set, responseValue, path, store }) => {
      // console.log(`check user  ${store}`, store);
      console.log(
        `[RES] ${path} → status: ${set.status}, response:`,
        JSON.stringify(responseValue)
      );
    });

export const testMiddleware = () => {
  console.log("object");
};

export const JWTMiddleware = () =>
  new Elysia().onBeforeHandle(({ headers }) => {
    console.log("lewat", headers);
  });
