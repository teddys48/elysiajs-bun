import { JWTPayloadInput } from "@elysiajs/jwt";
import { buildResponse } from "../helper/helper";
import * as repository from "../repository/auth.repository";
import bcrypt from "bcrypt";

export const login = async (body: any, accessToken: any, refreshToken: any) => {
  try {
    let checkUser = await repository.find(body.email);

    if (!checkUser) {
      return buildResponse(400, "user not found", {});
    }

    let checkPassword = await bcrypt.compare(body.password, checkUser.password);
    if (!checkPassword) {
      return buildResponse(400, "wrong password", {});
    }

    let tokenAccess = await accessToken.sign({ email: checkUser.email });
    let tokenRefresh = await refreshToken.sign({ email: checkUser.email });

    return buildResponse(0, "success", {
      access_token: tokenAccess,
      refresh_token: tokenRefresh,
    });
  } catch (error) {
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};

export const refreshToken = async (
  accessToken: any,
  refreshToken: any,
  claimData: any
) => {
  try {
    let tokenAccess = await accessToken.sign(claimData);
    let tokenRefresh = await refreshToken.sign(claimData);

    return buildResponse(0, "success", {
      access_token: tokenAccess,
      refresh_token: tokenRefresh,
    });
  } catch (error) {
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};

export const register = async (body: any) => {
  try {
    await repository.register(body);

    return buildResponse(0, "success", {});
  } catch (error) {
    return buildResponse(500, `${(error as Error).message}`, {});
  }
};
