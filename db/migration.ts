import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { hashPassword } from "@/helpers/utils";

export const migratePasswords = async () => {
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
};
