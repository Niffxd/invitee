import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/db/admin";

const db = getAdminDb();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ inviteeId: string }> }
) {
  try {
    const { inviteeId } = await params;

    if (!inviteeId) {
      return NextResponse.json({ error: "Invitee ID is required" }, { status: 400 });
    }

    const plusOnesSnap = await db
      .collection("plusOnes")
      .where("inviteeId", "==", inviteeId)
      .get();

    const plusOnes = plusOnesSnap.docs.map((doc) => doc.data());

    return NextResponse.json({ plusOnes });
  } catch (error) {
    console.error("Error fetching plus ones:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
