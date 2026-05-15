"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkEmailExists(email: string): Promise<boolean> {
  const existingUser = await db.query.user.findFirst({
    where: eq(user.email, email),
    columns: { id: true }
  });

  return !!existingUser;
}
