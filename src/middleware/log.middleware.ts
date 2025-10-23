import Elysia from "elysia";
import { generateRandomString } from "../helper/helper";

export const LogMiddleware = () =>
  new Elysia()
    .onBeforeHandle(async ({ request, path }) => {
      const body = await request.json().catch(() => null);
      console.log(`[REQ] ${path} → body:`, body);
    })
    .onAfterHandle(({ set, responseValue, path, store }) => {
      console.log(
        `[RES] ${path} → status: ${set.status}, response:`,
        JSON.stringify(responseValue)
      );
    });

export const testMiddleware = () => {
  console.log("object");
};
