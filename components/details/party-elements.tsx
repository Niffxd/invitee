import { WavesLadder, Hamburger, Beer, Dices, Donut, Martini } from "lucide-react";

const partyFeatures = [
  { icon: <WavesLadder size={36} strokeWidth={2} />, name: "Piscina", description: "Relajate y disfruta del agua" },
  { icon: <Hamburger size={36} strokeWidth={2} />, name: "Hamburguesas", description: "Frescas y deliciosas a la parrilla" },
  { icon: <Beer size={36} strokeWidth={2} />, name: "Beer Pong", description: "Juego clásico de fiesta" },
  { icon: <Dices size={36} strokeWidth={2} />, name: "Juegos de Mesa", description: "Variedad de juegos de fiesta" },
  { icon: <Donut size={36} strokeWidth={2} />, name: "Snacks", description: "Variedad de snacks y aperitivos" },
];

const partyNeeds = [
  { icon: <Martini size={36} strokeWidth={2} />, name: "Bebida", description: "No te olvides de traer lo que vas a tomar" },
];

export const PartyElements = {
  features: partyFeatures,
  needs: partyNeeds,
};
