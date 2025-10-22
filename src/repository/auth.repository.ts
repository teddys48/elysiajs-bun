import { db } from "../config/database";

export const find = async (email: string) => {
  return await db.table("users").where("email", email).first();
};

export const register = async (data: any) => {
  return await db.table("users").insert(data);
};
