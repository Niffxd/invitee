import { doc, serverTimestamp, writeBatch, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db/firebase";
import { InviteeProps, UpdateInviteeProps, PlusOneProps } from "@/types";

/**
 * Creates a single invitee via API route (uses Admin SDK)
 * @param name - The name of the invitee
 * @returns Promise that resolves with the created invitee ID
 */
export const createInvitee = async (name: string): Promise<string> => {
  const response = await fetch("/api/invitees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create invitee");
  }

  const data = await response.json();
  return data.inviteeId;
};

/**
 * Creates multiple invitees in Firestore from an array of names
 * @param names - Array of invitee names
 * @returns Promise that resolves with array of created invitee IDs
 */
export const createInvitees = async (names: string[]): Promise<string[]> => {
  const batch = writeBatch(db);
  const inviteeIds: string[] = [];

  names.forEach((name) => {
    const inviteeId = uuidv4();
    inviteeIds.push(inviteeId);
    const inviteeRef = doc(db, "invitees", inviteeId);

    batch.set(inviteeRef, {
      inviteeId,
      name,
      isConfirmed: false,
      hasPlusOne: false,
      notes: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });

  await batch.commit();
  return inviteeIds;
};

/**
 * Updates an existing invitee's confirmation status and other fields via API route (uses Admin SDK)
 * @param inviteeId - The ID of the invitee to update
 * @param data - The fields to update (isConfirmed, hasPlusOne, notes)
 * @param hasPlusOne - Whether the invitee is bringing a plus one
 * @param plusOneName - Name of the plus one if hasPlusOne is true
 * @returns Promise that resolves when the invitee is updated
 */
export const updateInvitee = async (
  inviteeId: string,
  data: UpdateInviteeProps,
  hasPlusOne: boolean,
  plusOneName?: string
): Promise<void> => {
  const response = await fetch(`/api/invitees/${inviteeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      hasPlusOne,
      plusOneName: hasPlusOne ? plusOneName : undefined,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update invitee");
  }
};


/**
 * Retrieves a single invitee by their ID
 * @param inviteeId - The ID of the invitee to retrieve
 * @returns Promise that resolves to the invitee data or null if not found
 */
export const getInvitee = async (inviteeId: string): Promise<InviteeProps | null> => {
  const inviteeRef = doc(db, "invitees", inviteeId);
  const inviteeSnap = await getDoc(inviteeRef);

  if (!inviteeSnap.exists()) {
    return null;
  }

  return inviteeSnap.data() as InviteeProps;
};

/**
 * Retrieves all invitees from Firestore
 * @returns Promise that resolves to an array of all invitees
 */
export const getInvitees = async (): Promise<InviteeProps[]> => {
  try {
    const inviteesRef = collection(db, "invitees");
    const querySnapshot = await getDocs(inviteesRef);

    const invitees: InviteeProps[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Ensure inviteeId is present (use doc.id as fallback)
      const invitee: InviteeProps = {
        ...data,
        inviteeId: data.inviteeId || doc.id,
      } as InviteeProps;
      invitees.push(invitee);
    });

    return invitees;
  } catch (error) {
    console.error("Error fetching invitees:", error);
    throw error;
  }
};

/**
 * Deletes an invitee and their associated plus one (if any)
 * @param inviteeId - The ID of the invitee to delete
 * @returns Promise that resolves when the invitee is deleted
 */
export const deleteInvitee = async (inviteeId: string): Promise<void> => {
  const response = await fetch(`/api/invitees/${inviteeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || "Failed to delete invitee");
  }
};

/**
 * Retrieves all plus ones from Firestore
 * @returns Promise that resolves to an array of all plus ones
 */
export const getAllPlusOne = async (): Promise<PlusOneProps[]> => {
  const plusOnesRef = collection(db, "plusOnes");
  const querySnapshot = await getDocs(plusOnesRef);

  const plusOnes: PlusOneProps[] = [];
  querySnapshot.forEach((doc) => {
    plusOnes.push(doc.data() as PlusOneProps);
  });

  return plusOnes;
};

/**
 * Retrieves plus ones for a specific invitee
 * @param inviteeId - The ID of the invitee whose plus ones should be fetched
 * @returns Promise that resolves to an array of plus ones for the invitee
 */
export const getAllPlusOneById = async (inviteeId: string): Promise<PlusOneProps[]> => {
  const response = await fetch(`/api/invitees/${inviteeId}/plus-ones`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || "Failed to load plus ones");
  }

  const data = await response.json();
  const plusOnes = (data.plusOnes || []) as PlusOneProps[];

  // Deduplicate by plusOneId in case the API returns duplicates
  const uniquePlusOnes = plusOnes.filter(
    (plusOne, index, self) =>
      index === self.findIndex((other) => other.plusOneId === plusOne.plusOneId)
  );

  return uniquePlusOnes;
};

/**
 * Deletes a plus one by their ID
 * @param plusOneId - The ID of the plus one to delete
 * @returns Promise that resolves when the plus one is deleted
 */
export const deletePlusOne = async (plusOneId: string): Promise<void> => {
  const plusOneRef = doc(db, "plusOnes", plusOneId);
  await deleteDoc(plusOneRef);
};
