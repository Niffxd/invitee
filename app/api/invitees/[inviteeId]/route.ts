import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/db/admin';
import { v4 as uuidv4 } from 'uuid';

const db = getAdminDb();

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ inviteeId: string }> }
) {
  try {
    const { inviteeId } = await params;

    if (!inviteeId) {
      return NextResponse.json(
        { error: 'Invitee ID is required' },
        { status: 400 }
      );
    }

    const inviteeRef = db.collection('invitees').doc(inviteeId);
    const inviteeDoc = await inviteeRef.get();

    if (!inviteeDoc.exists) {
      return NextResponse.json(
        { error: 'Invitee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      invitee: inviteeDoc.data(),
    });
  } catch (error) {
    console.error('Error fetching invitee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ inviteeId: string }> }
) {
  try {
    const { inviteeId } = await params;
    const body = await request.json();
    const { isConfirmed, isDeclined, hasPlusOne, notes, plusOneName } = body;

    if (!inviteeId) {
      return NextResponse.json(
        { error: 'Invitee ID is required' },
        { status: 400 }
      );
    }

    const inviteeRef = db.collection('invitees').doc(inviteeId);
    const inviteeDoc = await inviteeRef.get();

    if (!inviteeDoc.exists) {
      return NextResponse.json(
        { error: 'Invitee not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (typeof isConfirmed === 'boolean') {
      updateData.isConfirmed = isConfirmed;
    }

    if (typeof isDeclined === 'boolean') {
      updateData.isDeclined = isDeclined;
    }

    if (typeof hasPlusOne === 'boolean') {
      updateData.hasPlusOne = hasPlusOne;
    }

    if (typeof notes === 'string') {
      updateData.notes = notes;
    }

    // Update the invitee
    await inviteeRef.update(updateData);

    // Handle plus one creation/deletion
    if (hasPlusOne && plusOneName && typeof plusOneName === 'string' && plusOneName.trim().length > 0) {
      // Check if a plus one already exists for this invitee
      const existingPlusOnes = await db
        .collection('plusOnes')
        .where('inviteeId', '==', inviteeId)
        .get();

      // Delete existing plus ones
      const batch = db.batch();
      existingPlusOnes.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Create new plus one
      const plusOneId = uuidv4();
      const plusOneRef = db.collection('plusOnes').doc(plusOneId);
      batch.set(plusOneRef, {
        plusOneId,
        inviteeId,
        name: plusOneName.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await batch.commit();
    } else if (hasPlusOne === false) {
      // Delete all plus ones for this invitee if hasPlusOne is false
      const existingPlusOnes = await db
        .collection('plusOnes')
        .where('inviteeId', '==', inviteeId)
        .get();

      const batch = db.batch();
      existingPlusOnes.forEach((doc) => {
        batch.delete(doc.ref);
      });

      if (!existingPlusOnes.empty) {
        await batch.commit();
      }
    }

    return NextResponse.json({
      success: true,
      inviteeId,
    });
  } catch (error) {
    console.error('Error updating invitee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ inviteeId: string }> }
) {
  try {
    const { inviteeId } = await params;

    if (!inviteeId) {
      return NextResponse.json(
        { error: 'Invitee ID is required' },
        { status: 400 }
      );
    }

    const inviteeRef = db.collection('invitees').doc(inviteeId);
    const inviteeDoc = await inviteeRef.get();

    if (!inviteeDoc.exists) {
      return NextResponse.json(
        { error: 'Invitee not found' },
        { status: 404 }
      );
    }

    // Delete invitee and any associated plus ones in a single batch.
    const batch = db.batch();
    batch.delete(inviteeRef);

    const plusOnesSnap = await db
      .collection('plusOnes')
      .where('inviteeId', '==', inviteeId)
      .get();

    plusOnesSnap.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      inviteeId,
    });
  } catch (error) {
    console.error('Error deleting invitee:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
