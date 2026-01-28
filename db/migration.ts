import { getAdminDb } from "@/db/admin";
import { hashPassword } from "@/helpers/utils";

export const migratePasswords = async () => {
  try {
    const db = getAdminDb();
    const credentialsRef = db.collection("credentials");
    const snapshot = await credentialsRef.get();

    if (snapshot.empty) {
      console.log("No credentials found in database.");
      return;
    }

    let migratedCount = 0;
    let skippedCount = 0;

    for (const document of snapshot.docs) {
      const data = document.data();

      // Check if password is already hashed (bcrypt hashes start with $2)
      if (!data.password || data.password.startsWith('$2')) {
        console.log(`⏭️ Skipping ${data.username || document.id} (already hashed or no password)`);
        skippedCount++;
        continue;
      }

      console.log(`Hashing password for user: ${data.username || document.id}`);
      const hashedPassword = await hashPassword(data.password);

      await credentialsRef.doc(document.id).update({
        password: hashedPassword
      });

      console.log(`✓ Updated password for: ${data.username || document.id}`);
      migratedCount++;
    }

    console.log("Migration completed successfully!");
    console.log(`✅ Migrated: ${migratedCount}`);
    console.log(`⏭️ Skipped: ${skippedCount}`);
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
};
