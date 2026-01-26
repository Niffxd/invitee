# Password Migration Scripts

This directory contains scripts for migrating passwords from plain text to bcrypt hashes.

## ⚠️ SECURITY WARNING

**NEVER commit `serviceAccountKey.json` to version control!**

The `.gitignore` file should already exclude it, but double-check.

## Setup

### Step 1: Install Dependencies

```bash
npm install firebase-admin bcryptjs
```

### Step 2: Get Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon) → **Service Accounts**
4. Click **"Generate new private key"**
5. Save the downloaded file as `serviceAccountKey.json` in this `scripts/` directory

### Step 3: Run Migration

```bash
node scripts/migrate-passwords.js
```

## What It Does

The script will:
1. Connect to your Firestore database using Admin SDK (bypasses security rules)
2. Read all documents in the `credentials` collection
3. Check if passwords are already hashed (bcrypt hashes start with `$2`)
4. Hash any plain-text passwords using bcrypt
5. Update the documents with hashed passwords

## Sample Output

```
Starting password migration...

🔐 Hashing password for user: admin
✅ Updated password for: admin
⏭️  Skipping john_doe (already hashed)

=================================
Migration completed successfully!
✅ Migrated: 1
⏭️  Skipped: 1
=================================
```

## After Migration

1. Test your login functionality
2. **Delete the `serviceAccountKey.json` file** or store it securely
3. Update your Firestore security rules to lock down the credentials collection
