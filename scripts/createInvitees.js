const invitees = [
  "Test 1",
  "Test 2",
  "Test 3",
  "Test 4",
  "Test 5",
  "Test 6",
  "Test 7",
  "Test 8",
  "Test 9",
  "Test 10"
];

/**
 * Creates multiple invitees via API route (uses Admin SDK)
 * @param names - Array of names for the invitees to create
 * @returns Promise that resolves with an array of created invitee IDs
 */
const createInvitees = async (names) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/invitees/batch`, {
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

async function createAllInvitees() {
  try {
    console.log('Reading invitee list...\n');

    let inviteeCount = invitees.length;

    await createInvitees(invitees);

    console.log('\n=================================\n');
    console.log('Migration completed successfully!\n');
    console.log(`✅ Migrated: ${inviteeCount}\n`);
    console.log('\n=================================\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

createAllInvitees();
