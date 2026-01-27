export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // optional but avoids accidental static optimization

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAdminDb } from '@/db/admin';

const db = getAdminDb();

const allowedOrigin = process.env.CORS_ORIGIN ?? '*';

export async function POST(request: NextRequest) {
  try {
    const { admin: username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Query Firestore for the credential - try both 'admin' and 'username' fields
    const credentialsRef = db.collection('credentials');

    // First try with 'admin' field
    let snapshot = await credentialsRef
      .where('admin', '==', username)
      .get();

    // If not found, try with 'username' field
    if (snapshot.empty) {
      snapshot = await credentialsRef
        .where('username', '==', username)
        .get();
    }

    if (snapshot.empty) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const userData = snapshot.docs[0].data();

    // Verify password
    const isValid = await bcrypt.compare(password, userData.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Return success without password
    return NextResponse.json({
      success: true,
      credential: {
        credentialId: userData.credentialId,
        username: userData.username || userData.admin,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });

  res.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Access-Control-Max-Age', '86400');

  return res;
}
