import { db } from "../config/database";

export async function all() {
  return await db.table("posts");
}
