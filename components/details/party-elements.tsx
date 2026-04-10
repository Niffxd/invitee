import discoBallIcon from "@/assets/icons/disco-ball.png";
import { Beer, Martini, Music } from "lucide-react";

const partyFeatures = [
  // { icon: <WavesLadder size={36} strokeWidth={2} />, name: "Piscina", description: "Relajate y disfruta del agua" },
  {
    icon: <Martini size={36} strokeWidth={2} />,
    name: "Bartender",
    description: "Tragos de Gin, Vodka, Aperol, etc.",
  },
  // { icon: <Beer size={36} strokeWidth={2} />, name: "Beer Pong", description: "Juego clásico de fiesta" },
  // { icon: <Dices size={36} strokeWidth={2} />, name: "Juegos de Mesa", description: "Variedad de juegos de fiesta" }
  {
    icon: <Music size={36} strokeWidth={2} />,
    name: "DJ Nelson Mix",
    description: "DJ de Cachengue y Leo Mattioli.",
  },
  {
    icon: (
      <span
        className="inline-block size-9 shrink-0 bg-current"
        style={{
          WebkitMaskImage: `url(${discoBallIcon.src})`,
          maskImage: `url(${discoBallIcon.src})`,
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
        role="img"
        aria-label="Luces y Baile"
      />
    ),
    name: "Luces y Baile",
    description: "Boliche a partir de las 00:00 hs.",
  },
];

const partyNeeds = [
  {
    icon: <Beer size={36} strokeWidth={2} />,
    name: "Bebida",
    description: "Traer Fernet y Cerveza",
  },
];

export const PartyElements = {
  features: partyFeatures,
  needs: partyNeeds,
};
