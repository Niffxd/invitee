/**
 * Password Migration Script using Firebase Admin SDK
 * 
 * This script bypasses Firestore security rules and should be run server-side.
 * 
 * Setup:
 * 1. Install: npm install firebase-admin bcryptjs
 * 2. Download service account key from Firebase Console:
 *    - Go to Project Settings → Service Accounts
 *    - Click "Generate new private key"
 *    - Save as serviceAccountKey.json in this directory
 * 3. Run: node scripts/migrate-passwords.js
 */

import admin from 'firebase-admin';
import bcrypt from 'bcryptjs';

// Initialize Firebase Admin
import serviceAccount from './serviceAccountKey.json' with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function migratePasswords() {
  try {
    console.log('Starting password migration...\n');

    const credentialsRef = db.collection('credentials');
    const snapshot = await credentialsRef.get();

    if (snapshot.empty) {
      console.log('No credentials found in database.');
      return;
    }

    let migratedCount = 0;
    let skippedCount = 0;

    for (const document of snapshot.docs) {
      const data = document.data();

      // Get username from various possible field names
      const username = data.username || data.admin || data.user || data.name || 'unknown';

      console.log(`\n📄 Document ${document.id}:\n`, JSON.stringify(data, null, 2));

      // Check if password is already hashed (bcrypt hashes start with $2)
      if (!data.password || data.password.startsWith('$2')) {
        console.log(`\n\n⏭️ Skipping ${username} (already hashed or no password)\n`);
        skippedCount++;
        continue;
      }

      console.log(`\n🔐 Hashing password for user: ${username}`);
      const hashedPassword = await hashPassword(data.password);

      await credentialsRef.doc(document.id).update({
        password: hashedPassword
      });

      console.log(`✅ Updated password for: ${username}`);
      migratedCount++;
    }

    console.log('\n=================================\n');
    console.log('Migration completed successfully!\n');
    console.log(`✅ Migrated: ${migratedCount}\n`);
    console.log(`⏭️ Skipped: ${skippedCount}`);
    console.log('\n=================================\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migratePasswords();
