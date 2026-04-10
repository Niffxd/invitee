const invitees = [
  "Marin Vidal Eduardo Ernesto",
  "Diaz Romero Javier Matias",
  "Ohyama Miguel Ulises",
  "Esser Guillermo",
  "Nieva Ignacio",
  "Arce Lizondo Martin Nicolas",
  "Toledo Filmann Rocio Belen",
  "Alberdi Cornet Jose Mathias",
  "Silva Luis Federico",
  "Ramasco Luz",
  "Bulacio Alvarez Luciana",
  "Alvarez Juan Carlos",
  "Hayward Solana",
  "Quiñone Maria Emilia",
  "Vera Coronel Viviana Romina",
  "Peralta Aragon María Gisella",
  "Bocoy Carolina",
  "De Cristobal Aguero Diego Ignacio",
  "Juarez Mariana Soledad",
  "Chaile Mauro Natanael",
  "Vaquero Hector De Jesus",
  "Costilla Campero Gonzalo Javier",
  "Bazan Carlos Javier",
  "Levy Bernabe",
  "Ontiveros Victor Jose",
  "Villafañe Jose Nicolas",
  "Castro Fernanda Judith",
  "Helguero Sebastian Maximiliano",
  "Molina Daniela Rocio",
  "Valdez Mambrini Santiago",
  "Ullua Cecilia Ines",
  "Nazur Ignacio Jose",
  "Leone Eliana Florencia",
  "Fraga Jorge Horacio",
  "Adra Maria Gabriela",
  "Duchen Santillan Mayra Andrea",
  "Ballesteros Ana Daniela",
  "Nores Pondal Alejandro Jose",
  "Carrizo Christian Maximiliano",
  "Lucas Salomon",
  "Mariano Gonzalez",
  "Lucas Jimenez (Minimc)",
  "Shi Nieva",
  "Toto Flores",
  "Marina Novia Toto",
  "Vicente Lopez",
  "Belen Novia Vicente",
  "Kike",
  "Eduardo Granillo",
  "Pilo",
  "Nelson Ampuero",
  "Andrea Lopez",
  "Sol Prados Doc",
  "Stefania (Teff)",
  "Agusto Lescano (Negro)",
  "Mika Ampuero",
  "Juan Diego Lescano",
  "Consu Novia De Pato",
  "Patito Avellaneda",
  "Luciano Melto",
  "Marck Antony",
  "Victoria Lescano (Toia)",
  "Santi Lemir Tio",
  "Juli Tia",
  "Ron Arias",
  "Brenda Novia Ron",
  "Nicolas Sanchez (Chico)",
  "Rocio Avellaneda",
  "D' Angelo Ramon",
  "Selena Webee",
  "Claudio Bellido",
  "Flor Medina",
  "Leandro (Mosco)",
  "Jami Buabud",
  "Vale",
  "Ian Castriota",
  "Tania Novia Ian",
  "Vir Hermana Matias",
  "Matias Roger",
  "Tomy Avellaneda",
  "Maca Palomares",
  "Flor Agüero",
  "Matias (Fuegas)",
  "Andrea P",
  "Abril",
  "Luli",
  "Cinthya",
  "Anita",
  "Julieta",
  "Marianita",
  "Marina",
  "Pacha",
  "Ana G.",
  "Laura",
  "Ana L.",
  "Juli",
  "Pali",
  "Adrianita",
  "Rocio Abdala",
  "Virginia",
  "Naty",
  "Paola",
  "Emilse",
  "Cechu",
  "Gaby",
  "Cinthya",
  "Alvaro",
  "Conrado",
  "Dani",
  "Gisella",
  "Sil",
  "Lucho",
  "Malelo",
  "Vichi",
  "Rocio Fleitas",
  "Emanuel",
  "Maria Silvia Meuli",
  "Maria Silvia Macasso",
  "Marcela",
  "Daniela",
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
    console.log("Reading invitee list...\n");

    let inviteeCount = invitees.length;

    await createInvitees(invitees);

    console.log("\n=================================\n");
    console.log("Migration completed successfully!\n");
    console.log(`✅ Migrated: ${inviteeCount}\n`);
    console.log("\n=================================\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

createAllInvitees();
