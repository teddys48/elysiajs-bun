import { buildResponse } from "../helper/helper";

export const login = async (body: any) => {
  try {
  } catch (error) {
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};
