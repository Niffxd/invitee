import { doc, serverTimestamp, writeBatch, updateDoc, getDoc, setDoc, Timestamp, collection, getDocs, deleteDoc, query, where } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db/firebase";
import { InviteeProps, UpdateInviteeProps, PlusOne } from "@/types";

/**
 * Creates a single invitee in Firestore
 * @param name - The name of the invitee
 * @returns Promise that resolves with the created invitee ID
 */
export const createInvitee = async (name: string): Promise<string> => {
  const inviteeId = uuidv4();
  const inviteeRef = doc(db, "invitees", inviteeId);
  
  await setDoc(inviteeRef, {
    inviteeId,
    name,
    isConfirmed: false,
    hasPlusOne: false,
    notes: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return inviteeId;
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
 * Updates an existing invitee's confirmation status and other fields
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
  const inviteeRef = doc(db, "invitees", inviteeId);

  const updateData: Record<string, unknown> = {
    ...data,
    updatedAt: serverTimestamp()
  };

  await updateDoc(inviteeRef, updateData);

  // If the invitee has a plus one and a name is provided, create the plus one document
  if (hasPlusOne && plusOneName) {
    const plusOneId = uuidv4();
    const plusOneRef = doc(db, "plusOnes", plusOneId);

    const plusOneData: PlusOne = {
      plusOneId,
      inviteeId,
      name: plusOneName,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
    };

    await setDoc(plusOneRef, plusOneData);
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
  const inviteesRef = collection(db, "invitees");
  const querySnapshot = await getDocs(inviteesRef);

  const invitees: InviteeProps[] = [];
  querySnapshot.forEach((doc) => {
    invitees.push(doc.data() as InviteeProps);
  });

  return invitees;
};

/**
 * Deletes an invitee and their associated plus one (if any)
 * @param inviteeId - The ID of the invitee to delete
 * @returns Promise that resolves when the invitee is deleted
 */
export const deleteInvitee = async (inviteeId: string): Promise<void> => {
  const batch = writeBatch(db);

  // Delete the invitee
  const inviteeRef = doc(db, "invitees", inviteeId);
  batch.delete(inviteeRef);

  // Delete any associated plus ones
  const plusOnesRef = collection(db, "plusOnes");
  const plusOneQuery = query(plusOnesRef, where("inviteeId", "==", inviteeId));
  const plusOneSnapshot = await getDocs(plusOneQuery);

  plusOneSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
};

/**
 * Retrieves all plus ones from Firestore
 * @returns Promise that resolves to an array of all plus ones
 */
export const getAllPlusOne = async (): Promise<PlusOne[]> => {
  const plusOnesRef = collection(db, "plusOnes");
  const querySnapshot = await getDocs(plusOnesRef);

  const plusOnes: PlusOne[] = [];
  querySnapshot.forEach((doc) => {
    plusOnes.push(doc.data() as PlusOne);
  });

  return plusOnes;
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
