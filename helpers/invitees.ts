import { UpdateInviteeProps, PlusOneProps, InviteeProps } from "@/types";

/**
 * Retrieves a single invitee by ID via API route (uses Admin SDK)
 * @param inviteeId - The ID of the invitee to fetch
 * @returns Promise that resolves with the invitee data
 */
export const getInvitee = async (inviteeId: string): Promise<InviteeProps> => {
  const response = await fetch(`/api/invitees/${inviteeId}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || "Failed to load invitee");
  }

  const data = await response.json();
  return data.invitee as InviteeProps;
};

/**
 * Retrieves all invitees via API route (uses Admin SDK)
 * @returns Promise that resolves to an array of all invitees
 */
export const getInvitees = async (): Promise<InviteeProps[]> => {
  const response = await fetch("/api/invitees");

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || "Failed to load invitees");
  }

  const data = await response.json();
  const invitees = (data.invitees || []) as InviteeProps[];

  // Deduplicate by inviteeId in case the API returns duplicates
  const uniqueInvitees = invitees.filter(
    (invitee, index, self) =>
      index === self.findIndex((other) => other.inviteeId === invitee.inviteeId)
  );

  return uniqueInvitees;
};

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
 * Creates multiple invitees via API route (uses Admin SDK)
 * @param names - Array of names for the invitees to create
 * @returns Promise that resolves with an array of created invitee IDs
 */
export const createInvitees = async (names: string[]): Promise<string[]> => {
  const response = await fetch("/api/invitees/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ names }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create invitees");
  }

  const data = await response.json();
  return data.inviteeIds || [];
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
 * Retrieves all plus ones across all invitees via API route (uses Admin SDK)
 * @returns Promise that resolves to an array of all plus ones
 */
export const getAllPlusOne = async (): Promise<PlusOneProps[]> => {
  const response = await fetch("/api/plus-ones");

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
 * Deletes a plus one by ID via API route (uses Admin SDK)
 * @param plusOneId - The ID of the plus one to delete
 * @returns Promise that resolves when the plus one is deleted
 */
export const deletePlusOne = async (plusOneId: string): Promise<void> => {
  const response = await fetch(`/api/plus-ones/${plusOneId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || "Failed to delete plus one");
  }
};
