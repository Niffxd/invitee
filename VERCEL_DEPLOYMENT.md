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
- **Value:** The entire private key string from your JSON file
- **Environment:** Production, Preview, Development (select all)

**IMPORTANT - How to add FIREBASE_PRIVATE_KEY correctly:**

There are two methods to add this in Vercel:

**Method 1: Copy directly from JSON file (Recommended)**
1. Open your `serviceAccountKey.json` file
2. Find the `"private_key"` field
3. Copy the ENTIRE value including the quotes, `\n` characters, and everything between the quotes
4. Paste it directly into Vercel (including the quotes)
5. Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"`

**Method 2: As a multiline string**
1. Copy just the key content (without the surrounding quotes from JSON)
2. The value should look like this (multiline):
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
... (more lines of the key) ...
-----END PRIVATE KEY-----
```

**Common Issues:**
- ❌ Don't remove the `\n` characters if using Method 1
- ❌ Don't add extra spaces or newlines
- ✅ The code will automatically format the key correctly
- ✅ Make sure to include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

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

### Error: "Failed to parse private key: Invalid PEM formatted message"
This is the most common error. The private key is not properly formatted. Try these solutions:

**Solution 1: Re-add the private key with quotes**
1. Go to Vercel → Settings → Environment Variables
2. Delete the existing `FIREBASE_PRIVATE_KEY` variable
3. Open your `serviceAccountKey.json` file
4. Copy the entire `private_key` value INCLUDING the surrounding double quotes
5. Example: `"-----BEGIN PRIVATE KEY-----\nMIIEvQI...\n-----END PRIVATE KEY-----\n"`
6. Paste it directly into Vercel (with the quotes)
7. Save and redeploy

**Solution 2: Use Base64 encoding (Alternative)**
If Method 1 doesn't work, you can Base64 encode the key:
1. Get the private key from your JSON file (the value, not including the outer quotes)
2. Base64 encode it using an online tool or command line
3. Add to Vercel as `FIREBASE_PRIVATE_KEY_BASE64`
4. Update the code to decode it (contact developer for this change)

### Error: "ENOENT: no such file or directory"
- This means environment variables are not set in Vercel
- Follow Step 3 above to add all three variables

### Error: "Failed to initialize Firebase Admin"
- Check that all three environment variables are set correctly
- Verify the private key includes the BEGIN/END markers
- Check Vercel deployment logs for the specific error
- Make sure there are no extra spaces or characters

### Error: "The default Firebase app does not exist"
- Firebase Admin failed to initialize
- Check Vercel build logs for the specific initialization error
- Verify your Firebase project ID is correct (should be `invitee-c68f4`)

### Still having issues?
1. Check the deployment logs in Vercel for the exact error message
2. Verify all three environment variables are set in the correct environment (Production/Preview/Development)
3. Try redeploying after setting the variables
4. Make sure the environment variables don't have any trailing spaces or newlines
