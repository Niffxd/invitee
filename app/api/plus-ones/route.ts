import { NextResponse } from "next/server";
import { getAdminDb } from "@/db/admin";

const db = getAdminDb();

/**
 * Returns all plus ones across all invitees.
 * Shape: { plusOnes: PlusOne[] }
 */
export async function GET() {
  try {
    const plusOnesSnap = await db.collection("plusOnes").orderBy("createdAt", "asc").get();
    const plusOnes = plusOnesSnap.docs.map((doc) => doc.data());

    return NextResponse.json({ plusOnes });
  } catch (error) {
    console.error("Error fetching plus ones:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

