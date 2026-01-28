const invitees = [
  "Augusto Lescano",
  "Stefania Smut",
  "Juan Diego Lescano",
  "Mika Ampuero",
  "Diego Perez Lucena",
  "Gabriel Perez Lucena",
  "Fausto Juarez",
  "Benjamin Juarez",
  "Lucas Jimenez",
  "Mariano Gonzalez",
  "Ivan Ampuero",
  "Lucas Salomon",
  "Rocio Avellaneda",
  "Leandro Urrere",
  "Luciano Melto",
  "Matias Roger Narcotti",
  "Miguel Torres",
  "Selena Wehbe",
  "David",
  "Sol Prados Moreno",
  "Tania Ruiz",
  "Ian Castriotta",
  "Franco Ron Ares",
  "Brenda Cest",
  "Florencia Medina",
  "Virginia Roger Narcotti",
  "Lizeth ",
  "Exequiel Perez",
  "Hernan Sanchez Ortiz",
  "Joaquin Sales",
  "Belen Teran",
  "Facundo Orellana",
  "Valentina Rodriguez"
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
