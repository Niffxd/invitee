import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/db';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeAll } from '@/helpers';

const db = getAdminDb();

export async function GET() {
  try {
    const inviteesSnap = await db
      .collection("invitees")
      .orderBy("createdAt", "asc")
      .get();

    const invitees = inviteesSnap.docs.map((doc) => doc.data());

    return NextResponse.json({ invitees });
  } catch (error) {
    console.error("Error fetching invitees:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    const inviteeId = uuidv4();
    const inviteeRef = db.collection('invitees').doc(inviteeId);

    await inviteeRef.set({
      inviteeId,
      name: capitalizeAll(name),
      isConfirmed: false,
      isDeclined: false,
      hasPlusOne: false,
      notes: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      inviteeId,
    });
  } catch (error) {
    console.error('Error creating invitee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
