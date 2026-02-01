import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/db";
import { v4 as uuidv4 } from "uuid";
import { capitalizeAll } from "@/helpers";

const db = getAdminDb();

export async function POST(request: NextRequest) {
  try {
    const { names } = await request.json();

    if (!Array.isArray(names) || names.length === 0) {
      return NextResponse.json(
        { error: "Names array is required" },
        { status: 400 }
      );
    }

    const batch = db.batch();
    const inviteeIds: string[] = [];

    names.forEach((rawName: unknown) => {
      if (typeof rawName !== "string" || rawName.trim().length === 0) {
        return;
      }

      const name = capitalizeAll(rawName);
      const inviteeId = uuidv4();
      const inviteeRef = db.collection("invitees").doc(inviteeId);

      batch.set(inviteeRef, {
        inviteeId,
        name,
        isConfirmed: false,
        hasPlusOne: false,
        notes: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      inviteeIds.push(inviteeId);
    });

    if (inviteeIds.length === 0) {
      return NextResponse.json(
        { error: "No valid names provided" },
        { status: 400 }
      );
    }

    await batch.commit();

    return NextResponse.json({
      success: true,
      inviteeIds,
    });
  } catch (error) {
    console.error("Error creating invitees batch:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

