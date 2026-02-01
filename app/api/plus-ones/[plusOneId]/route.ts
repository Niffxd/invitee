import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/db";

const db = getAdminDb();

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ plusOneId: string }> }
) {
  try {
    const { plusOneId } = await params;

    if (!plusOneId) {
      return NextResponse.json({ error: "Plus one ID is required" }, { status: 400 });
    }

    const plusOneRef = db.collection("plusOnes").doc(plusOneId);
    const plusOneDoc = await plusOneRef.get();

    if (!plusOneDoc.exists) {
      return NextResponse.json({ error: "Plus one not found" }, { status: 404 });
    }

    await plusOneRef.delete();

    return NextResponse.json({ success: true, plusOneId });
  } catch (error) {
    console.error("Error deleting plus one:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

