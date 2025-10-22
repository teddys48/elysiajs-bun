import { db } from "../config/database";

export async function all() {
  return await db.table("posts");
}

export const find = async (id: number) => {
  return await db.table("posts").where("id", id).first();
};

export const create = async (data: any) => {
  return await db.table("posts").insert(data);
};

export const update = async (id: number, data: any) => {
  return await db.table("posts").where("id", id).update(data);
};

export const del = async (id: number) => {
  return await db.table("posts").where("id", id).delete();
};
