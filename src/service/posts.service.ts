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

export const find = async (id: any) => {
  try {
    let res = await repository.find(id);

    if (!res) {
      return buildResponse(400, "data not found", {});
    }

    return buildResponse(0, "success", res);
  } catch (error) {
    console.log("error", error);
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};

export const create = async (data: any) => {
  try {
    await repository.create(data);

    return buildResponse(0, "success", {});
  } catch (error) {
    console.log("error", error);
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};

export const update = async (id: any, data: any) => {
  try {
    let check = await repository.find(id);
    if (!check) {
      return buildResponse(400, "data not found", {});
    }

    await repository.update(id, data);

    return buildResponse(0, "success", {});
  } catch (error) {
    console.log("error", error);
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};

export const del = async (id: number) => {
  try {
    let check = await repository.find(id);
    if (!check) {
      return buildResponse(400, "data not found", {});
    }

    await repository.del(id);

    return buildResponse(0, "success", {});
  } catch (error) {
    console.log("error", error);
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};
