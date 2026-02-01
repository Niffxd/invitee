import { Card } from "@heroui/react"; //TODO: Use our own card component
import { PartyElements } from "./party-elements";

export const Details = () => {
  const { features, needs } = PartyElements;

  return (
    <div className="relative p-8">
      <div className="relative max-w-xl mx-auto">
        <div
          className="animate-slide-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

            <div className="relative">
              <Card className="w-full p-6 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">¿Qué necesitas traer?</h3>
                <ul className="space-y-3">
                  {needs.map((need, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 animate-slide-in-up opacity-0"
                      style={{
                        animationDelay: `${0.2 + index * 0.1}s`,
                        animationFillMode: "forwards"
                      }}
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
                <h3 className="text-xl font-bold text-foreground mt-6 mb-4">¿Qué tendremos?</h3>
                <ul className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 animate-slide-in-up opacity-0"
                      style={{
                        animationDelay: `${0.3 + index * 0.1}s`,
                        animationFillMode: "forwards"
                      }}
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
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
