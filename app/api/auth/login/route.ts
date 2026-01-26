import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';
import path from 'path';
import { readFileSync } from 'fs';

// Initialize Firebase Admin (only if not already initialized)
if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(process.cwd(), 'scripts', 'serviceAccountKey.json');
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
}

const db = admin.firestore();

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
