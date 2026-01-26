import { AlertCircle, PartyPopper } from "lucide-react";
import { LoginLink } from "./login-link";

export const Header = ({ inviteeId }: { inviteeId: string | undefined }) => {
  return (
    <div className="text-center relative py-12">
      {/* Icon with enhanced animations */}
      <LoginLink enable={!(inviteeId !== typeof String || inviteeId === undefined)}>
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 mb-6 relative shadow-lg animate-scale-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
          <div className="absolute inset-2 rounded-full bg-white/80 dark:bg-background/80" />
          <PartyPopper className="w-12 h-12 text-primary relative z-50 animate-bounce-gentle transition-transform cursor-pointer" />
        </div>
      </LoginLink>

      {/* Invitation text with slide-up animation */}
      <p
        className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 animate-slide-in-up"
        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
      >
        <span className="inline-block animate-shimmer bg-linear-to-r from-primary via-primary/80 to-primary bg-size-[200%_100%] bg-clip-text">
          Estás invitado/a
        </span>
      </p>

      {/* Main title with enhanced gradient and animation */}
      <h1
        className="text-5xl md:text-7xl font-display font-bold mb-4 animate-slide-in-up"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        <span className="inline-block bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient-shift transition-transform cursor-default">
          ¡Gran Fiesta!
        </span>
      </h1>

      {/* Description with fade-in animation */}
      <p
        className="px-12 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.4s", animationFillMode: "both" }}
      >
        Te invitamos a celebrar con nosotros un día lleno de música, alegría y buenos momentos.
      </p>

      {/* Decorative line with animation */}
      <div
        className="mt-8 mx-auto w-32 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent animate-scale-in"
        style={{ animationDelay: "0.5s", animationFillMode: "both" }}
      />
      {/* Unique Invitation Tip */}
      <div
        className="animate-slide-in-up mx-auto"
        style={{ animationDelay: "0.25s", animationFillMode: "both", width: "fit-content" }}
      >
        <div className="rounded-lg bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-3 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0" />
            <span className="text-xs sm:text-sm text-yellow-500">
              <strong className="font-semibold text-yellow-500"></strong> Esta invitación es única para cada persona
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
