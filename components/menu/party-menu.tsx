import { Hamburger, Vegan, Salad, Donut } from "lucide-react";

const partyMenu = [
  {
    icon: <Hamburger size={36} strokeWidth={2} />,
    name: "Hamburguesas",
    description: "Frescas y deliciosas a la parrilla",
  },
  {
    icon: <Vegan size={36} strokeWidth={2} />,
    name: "Vegano",
    description: "Dejanos una nota con tus preferencias veganas",
  },
  {
    icon: <Salad size={36} strokeWidth={2} />,
    name: "Vegano",
    description: "Dejanos una nota con tus preferencias vegetarianas",
  },
  {
    icon: <Donut size={36} strokeWidth={2} />,
    name: "Snacks",
    description: "Variedad de snacks y aperitivos",
  },
];

export const PartyMenu = {
  menu: partyMenu,
};
