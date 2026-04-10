import { Card } from "@heroui/react"; //TODO: Use our own card component
import { PartyMenu } from "./party-menu";

export const Menu = () => {
  const { menu } = PartyMenu;

  return (
    <div className="relative p-6">
      <div className="relative max-w-xl mx-auto">
        <div
          className="animate-slide-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-accent via-primary to-accent rounded-2xl opacity-75 blur transition duration-500" />

            <div className="relative">
              <Card className="w-full p-6 backdrop-blur-sm bg-surface/90 border border-border/30 shadow-lg">
                <h3 className="text-sm font-bold text-foreground mb-0.5">
                  Menú
                </h3>
                <ul className="space-y-4">
                  {menu.map((option, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 animate-slide-in-up opacity-0"
                      style={{
                        animationDelay: `${0.2 + index * 0.1}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      <div className="text-accent mt-0.5">{option.icon}</div>
                      <div className="flex-1">
                        <span className="text-xs font-bold text-foreground block">
                          {option.name}
                        </span>
                        <p className="text-xs text-muted leading-4">
                          {option.description}
                        </p>
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
