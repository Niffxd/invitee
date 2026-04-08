import { Hamburger, Beer, Donut, Martini, Spotlight, Music } from "lucide-react";

const partyFeatures = [
  // { icon: <WavesLadder size={36} strokeWidth={2} />, name: "Piscina", description: "Relajate y disfruta del agua" },
  { icon: <Martini size={36} strokeWidth={2} />, name: "Tragos", description: "Tragos de Gin, Vodka, Aperol, etc." },
  { icon: <Hamburger size={36} strokeWidth={2} />, name: "Hamburguesas", description: "Frescas y deliciosas a la parrilla" },
  // { icon: <Beer size={36} strokeWidth={2} />, name: "Beer Pong", description: "Juego clásico de fiesta" },
  // { icon: <Dices size={36} strokeWidth={2} />, name: "Juegos de Mesa", description: "Variedad de juegos de fiesta" },
  { icon: <Donut size={36} strokeWidth={2} />, name: "Snacks", description: "Variedad de snacks y aperitivos" },
  { icon: <Music size={36} strokeWidth={2} />, name: "DJ Nelson Mix", description: "DJ de Cachengue y Leo Mattioli." },
  { icon: <Spotlight size={36} strokeWidth={2} />, name: "Luces y Baile", description: "Boliche a partir de las 00:00 hs." }
];

const partyNeeds = [
  { icon: <Beer size={36} strokeWidth={2} />, name: "Bebida", description: "Traer Fernet y Cerveza" },
];

export const PartyElements = {
  features: partyFeatures,
  needs: partyNeeds,
};
