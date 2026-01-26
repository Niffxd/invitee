import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';
import path from 'path';
import { readFileSync } from 'fs';

// Initialize Firebase Admin (only if not already initialized)
if (!admin.apps.length) {
  try {
    let credential;

    // For production (Vercel): use environment variables
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      credential = admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Vercel stores multiline strings with \n as literal characters, so we need to replace them
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
    } 
    // For local development: use service account key file
    else {
      const serviceAccountPath = path.join(process.cwd(), 'scripts', 'serviceAccountKey.json');
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      credential = admin.credential.cert(serviceAccount);
    }
    
    admin.initializeApp({
      credential: credential
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
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
