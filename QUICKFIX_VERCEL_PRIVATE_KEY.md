# Quick Fix: How to Add FIREBASE_PRIVATE_KEY to Vercel

## The Problem
You're getting this error:
```
Failed to parse private key: Error: Invalid PEM formatted message.
```

This means the `FIREBASE_PRIVATE_KEY` environment variable in Vercel is not properly formatted.

## The Solution (Step-by-Step)

### Step 1: Open your serviceAccountKey.json file

It should look like this:

```json
{
  "type": "service_account",
  "project_id": "invitee-c68f4",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@invitee-c68f4.iam.gserviceaccount.com",
  ...
}
```

### Step 2: Copy the ENTIRE private_key value

**✅ CORRECT WAY - Copy INCLUDING the quotes:**

Select and copy this entire part (including the quotes):
```
"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"
```

**❌ WRONG WAY - Don't remove the quotes or \n:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQE...
-----END PRIVATE KEY-----
```

### Step 3: Go to Vercel

1. Open your Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**

### Step 4: Add/Update the Variable

1. Click "Add New" (or edit existing `FIREBASE_PRIVATE_KEY`)
2. **Name:** `FIREBASE_PRIVATE_KEY`
3. **Value:** Paste the value you copied (with quotes and \n)
4. **Environments:** Select all (Production, Preview, Development)
5. Click "Save"

### Step 5: Verify the other two variables exist

Make sure you also have:

- **FIREBASE_PROJECT_ID** = `invitee-c68f4`
- **FIREBASE_CLIENT_EMAIL** = `firebase-adminsdk-xxxxx@invitee-c68f4.iam.gserviceaccount.com`

### Step 6: Redeploy

1. Go to **Deployments** tab
2. Click on your latest deployment
3. Click the three dots (⋯) → **Redeploy**
4. Wait for the deployment to complete

### Step 7: Check the logs

After deployment:
1. Click on your deployment
2. Go to the **Functions** tab
3. Click on any function and check the logs
4. You should see: `"Firebase Admin initialized with environment variables"`

---

## Still Not Working?

### Option 1: Try this alternative format

Instead of copying with quotes, try this:
1. Remove the existing `FIREBASE_PRIVATE_KEY` variable in Vercel
2. Add it again, but this time paste just the content (without outer quotes)
3. Make sure it starts with `-----BEGIN PRIVATE KEY-----` and ends with `-----END PRIVATE KEY-----`

### Option 2: Verify your serviceAccountKey.json

Make sure your local `serviceAccountKey.json` works:
1. Delete the `.next` folder locally
2. Run `pnpm dev`
3. Try to log in at http://localhost:3000/login
4. If it works locally, the key is valid

### Option 3: Generate a new key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: invitee-c68f4
3. Settings (⚙️) → Service Accounts
4. Click "Generate New Private Key"
5. Download the new JSON file
6. Use this new file to update Vercel environment variables

---

## Contact for Help

If you're still having issues after trying all the above:
1. Check the exact error message in Vercel deployment logs
2. Verify there are no extra spaces or characters in the environment variable
3. Make sure you're updating the correct environment (Production/Preview/Development)
