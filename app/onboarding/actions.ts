"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function saveOnboardingAction(data: {
  role: string;
  mapStyle: string;
  interests: string[];
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Convert array of interests to a comma-separated string or JSON string to store in the DB
  const interestsString = JSON.stringify(data.interests);

  await db
    .update(user)
    .set({
      role: data.role,
      mapStyle: data.mapStyle,
      interests: interestsString,
    })
    .where(eq(user.id, userId));

  return { success: true };
}
