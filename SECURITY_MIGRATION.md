# Password Security Migration Guide

## What Changed

The authentication system has been upgraded with the following security improvements:

1. **Password Hashing**: Passwords are now hashed using bcryptjs before storage
2. **Secure Verification**: Password verification happens server-side using hash comparison
3. **No Password Exposure**: API responses no longer include password data
4. **Proper Error Handling**: Added try-catch blocks for better error management

## Migration Steps

### Important: Choose Your Migration Method

You have **two options** for migrating passwords. The permissions error you're seeing is because client-side code cannot bypass Firestore security rules.

#### Option 1: Server-Side Script (Recommended) ✅

Use the Firebase Admin SDK script that bypasses security rules safely.

**Steps:**
1. Install dependencies:
   ```bash
   npm install firebase-admin bcryptjs
   ```

2. Get your Firebase service account key:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `scripts/serviceAccountKey.json`

3. Run the migration:
   ```bash
   node scripts/migrate-passwords.js
   ```

See `scripts/README.md` for detailed instructions.

#### Option 2: Temporary Security Rule Change ⚠️

Temporarily allow writes, run client-side migration, then lock down again.

**Steps:**
1. In Firebase Console → Firestore → Rules, temporarily add:
   ```
   match /credentials/{credentialId} {
     allow read, write: if true;  // TEMPORARY
   }
   ```

2. Call your migration function from the browser console or component

3. **Immediately** revert to secure rules:
   ```
   match /credentials/{credentialId} {
     allow read, write: if false;
   }
   ```

### Step 1: Update Existing Credentials in Firestore

You need to hash all existing plain-text passwords in your Firebase database. Here's a migration script:

```typescript
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { hashPassword } from "@/helpers/utils";

async function migratePasswords() {
  try {
    const credentialsRef = collection(db, "credentials");
    const snapshot = await getDocs(credentialsRef);

    for (const document of snapshot.docs) {
      const data = document.data();
      
      // Check if password is already hashed (bcrypt hashes start with $2)
      if (!data.password.startsWith('$2')) {
        console.log(`Hashing password for user: ${data.username}`);
        const hashedPassword = await hashPassword(data.password);
        
        await updateDoc(doc(db, "credentials", document.id), {
          password: hashedPassword
        });
        
        console.log(`✓ Updated password for: ${data.username}`);
      }
    }
    
    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run this once to migrate all passwords
migratePasswords();
```

### Step 2: Verify Migration

After running the migration script, verify it worked:

1. Check the script output shows successful migration
2. Try logging in with your credentials
3. Check Firestore Console to see hashed passwords (they start with `$2a$` or `$2b$`)

### Step 3: Creating New Credentials

When creating new credentials, always hash the password first:

```typescript
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/db/firebase";
import { hashPassword } from "@/helpers/utils";
import { v4 as uuidv4 } from "uuid";

async function createCredential(username: string, plainPassword: string) {
  const hashedPassword = await hashPassword(plainPassword);
  
  await addDoc(collection(db, "credentials"), {
    credentialId: uuidv4(),
    username: username,
    password: hashedPassword
  });
}
```

### Step 4: Firestore Security Rules

Update your Firestore security rules to prevent direct password reads:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /credentials/{credentialId} {
      // Only allow reads through authenticated admin API
      allow read: if false;
      
      // Only allow writes through authenticated admin API
      allow write: if false;
    }
  }
}
```

## Testing

After migration, test the login flow:

1. Try logging in with a valid username and password
2. Try logging in with an invalid username
3. Try logging in with a valid username but wrong password
4. Verify that no password data is returned in the response

## Important Notes

- **Never log passwords**: Even in development, avoid logging plain-text passwords
- **Use HTTPS**: Always use HTTPS in production to protect credentials in transit
- **Rate limiting**: Consider adding rate limiting to prevent brute-force attacks
- **Session management**: Implement proper session/token management after successful login
