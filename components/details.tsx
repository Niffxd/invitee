import { Card } from "@heroui/react";
import { AudioWaveform, Beer, Dices, Donut, Hamburger, Martini, WavesLadder } from "lucide-react";

export const Details = () => {
  const partyFeatures = [
    { icon: <WavesLadder size={36} strokeWidth={2} />, name: "Piscina", description: "Relajate y disfruta del agua" },
    { icon: <Hamburger size={36} strokeWidth={2} />, name: "Hamburguesas", description: "Frescas y deliciosas a la parrilla" },
    { icon: <Beer size={36} strokeWidth={2} />, name: "Beer Pong", description: "Juego clásico de fiesta" },
    { icon: <AudioWaveform size={36} strokeWidth={2} />, name: "Música", description: "Gran playlist para toda la noche" },
    { icon: <Dices size={36} strokeWidth={2} />, name: "Juegos de Mesa", description: "Variedad de juegos de fiesta" },
    { icon: <Donut size={36} strokeWidth={2} />, name: "Snacks", description: "Variedad de snacks y aperitivos" },
  ];

  const partyNeeds = [
    { icon: <Martini size={36} strokeWidth={2} />, name: "Bebida", description: "No te olvides de traer lo que vas a tomar" },
  ];

  return (
    <div className="relative p-8">
      <div className="relative max-w-3xl mx-auto">
        <div
          className="animate-slide-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

            <div className="relative">
              <Card className="w-full p-6 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">¿Qué tendremos?</h3>
                <ul className="space-y-3 mb-6">
                  {partyFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="text-accent mt-0.5">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-bold text-foreground block">
                          {feature.name}
                        </span>
                        <span className="text-xs sm:text-sm text-muted">
                          {feature.description}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border/30">
                  <h3 className="text-xl font-bold text-foreground mb-4">¿Qué necesitas traer?</h3>
                  <ul className="space-y-3">
                    {partyNeeds.map((need, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <div className="text-accent mt-0.5">
                          {need.icon}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm sm:text-base font-bold text-foreground block">
                            {need.name}
                          </span>
                          <span className="text-xs sm:text-sm text-muted">
                            {need.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
