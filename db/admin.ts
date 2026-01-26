import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

/**
 * Helper function to properly format the private key for Firebase Admin
 * Handles various formats from environment variables
 */
function formatPrivateKey(key: string): string {
  // Remove any surrounding quotes
  let formattedKey = key.trim().replace(/^["']|["']$/g, '');
  
  // Replace literal \n with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, '\n');
  
  // Ensure proper BEGIN/END formatting
  if (!formattedKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
    formattedKey = '-----BEGIN PRIVATE KEY-----\n' + formattedKey;
  }
  if (!formattedKey.endsWith('-----END PRIVATE KEY-----\n')) {
    formattedKey = formattedKey + '\n-----END PRIVATE KEY-----\n';
  }
  
  return formattedKey;
}

/**
 * Initialize Firebase Admin SDK
 * Uses environment variables in production (Vercel) and service account file locally
 */
export function initializeAdmin() {
  // Return existing app if already initialized
  if (admin.apps.length > 0) {
    return admin.app();
  }

  try {
    let credential;

    // For production (Vercel): use environment variables
    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_PRIVATE_KEY &&
      process.env.FIREBASE_CLIENT_EMAIL
    ) {
      const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

      credential = admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      });

      console.log('Firebase Admin initialized with environment variables');
    }
    // For local development: use service account key file
    else {
      const serviceAccountPath = path.join(
        process.cwd(),
        'scripts',
        'serviceAccountKey.json'
      );
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
      credential = admin.credential.cert(serviceAccount);
      console.log('Firebase Admin initialized with service account key file');
    }

    return admin.initializeApp({
      credential: credential,
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
}

/**
 * Get Firestore database instance
 */
export function getAdminDb() {
  initializeAdmin();
  return admin.firestore();
}

/**
 * Get Firebase Admin Auth instance
 */
export function getAdminAuth() {
  initializeAdmin();
  return admin.auth();
}
