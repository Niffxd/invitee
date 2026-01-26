# Vercel Deployment Guide

## Firebase Admin SDK Environment Variables

To deploy this application on Vercel, you need to configure Firebase Admin SDK credentials as environment variables instead of using the `serviceAccountKey.json` file.

### Step 1: Get Your Firebase Service Account Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **invitee-c68f4**
3. Click on the gear icon (⚙️) > **Project Settings**
4. Go to the **Service Accounts** tab
5. Click **Generate New Private Key**
6. A JSON file will be downloaded - open it in a text editor

### Step 2: Extract the Required Values

From the downloaded JSON file, you need three values:

```json
{
  "project_id": "invitee-c68f4",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@invitee-c68f4.iam.gserviceaccount.com"
}
```

### Step 3: Add Environment Variables to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add the following three variables:

#### Variable 1: FIREBASE_PROJECT_ID
- **Name:** `FIREBASE_PROJECT_ID`
- **Value:** `invitee-c68f4`
- **Environment:** Production, Preview, Development (select all)

#### Variable 2: FIREBASE_CLIENT_EMAIL
- **Name:** `FIREBASE_CLIENT_EMAIL`
- **Value:** `firebase-adminsdk-xxxxx@invitee-c68f4.iam.gserviceaccount.com`
  - (Copy the exact `client_email` value from your JSON file)
- **Environment:** Production, Preview, Development (select all)

#### Variable 3: FIREBASE_PRIVATE_KEY
- **Name:** `FIREBASE_PRIVATE_KEY`
- **Value:** The entire private key string, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- **Environment:** Production, Preview, Development (select all)

**IMPORTANT for FIREBASE_PRIVATE_KEY:**
- Copy the entire `private_key` value from the JSON file
- Make sure to include the `\n` characters as-is (don't convert them to actual newlines)
- The value should look like: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADA...\n-----END PRIVATE KEY-----\n"`
- Vercel will automatically handle the `\n` conversion

### Step 4: Redeploy

After adding the environment variables:
1. Go to **Deployments**
2. Find your latest deployment
3. Click the three dots menu (⋯) > **Redeploy**
4. Or simply push a new commit to trigger a deployment

### Step 5: Verify

Check your deployment logs to ensure Firebase Admin initializes successfully. You should see no errors related to Firebase initialization.

---

## Local Development

For local development, you can continue using the `scripts/serviceAccountKey.json` file. The code automatically detects whether to use environment variables (production) or the JSON file (local development).

### Local Setup:
1. Place your `serviceAccountKey.json` file in the `scripts/` folder
2. This file is already in `.gitignore` and will never be committed
3. Run your app normally with `pnpm dev`

---

## Security Notes

✅ **DO:**
- Use environment variables in production
- Keep your service account key secure
- Rotate keys regularly

❌ **DON'T:**
- Commit `serviceAccountKey.json` to version control
- Share your private keys publicly
- Use the same keys across multiple projects

---

## Troubleshooting

### Error: "ENOENT: no such file or directory"
- This means environment variables are not set in Vercel
- Follow Step 3 above to add all three variables

### Error: "Failed to initialize Firebase Admin"
- Check that all three environment variables are set correctly
- Verify the private key includes the BEGIN/END markers
- Make sure `\n` characters are preserved in the private key

### Error: "The default Firebase app does not exist"
- Firebase Admin failed to initialize
- Check Vercel build logs for the specific error
- Verify your Firebase project ID is correct
