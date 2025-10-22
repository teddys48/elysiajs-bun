import { buildResponse } from "../helper/helper";
import * as repository from "../repository/posts.repository";

export async function all(req: Request) {
  try {
    let res = await repository.all();
    return buildResponse(0, "success", res);
  } catch (error) {
    console.log("error", error);
    return buildResponse(500, `${(error as Error).message}`, {});
  }
}
