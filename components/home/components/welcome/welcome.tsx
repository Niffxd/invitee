import {
  AlertCircle,
  ArrowBigDown,
  CakeSlice,
  PartyPopper,
} from "lucide-react";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import { ButtonLink } from "./components";
import {
  alternativeInvitationLinkText,
  alternativeInvitationTip,
  alternativeInviteeMessage,
  inviteeMessage,
  uniqueInvitationTip,
  invitationLink,
} from "./consts";
import { WelcomeProps } from "./types";

const sweetHipsterFont = localFont({
  src: [
    {
      path: "../../../../assets/fonts/SweetHipster.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  fallback: ["ui-serif", "Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '400',
  style: 'normal',
  variable: '--font-playfair-display',
  display: 'swap',
});

export const Welcome = ({ inviteeId }: WelcomeProps) => {
  return (
    <div className="text-center relative py-12">
      {/* Icon with enhanced animations */}
      <ButtonLink
        enable={inviteeId !== null}
        to="/login"
        description="Go to login"
      >
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 mb-6 relative shadow-2xl animate-scale-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
          <div className="absolute inset-2 rounded-full bg-surface/85 backdrop-blur-[2px] ring-1 ring-border/40" />
          <PartyPopper className="w-12 h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />
        </div>
      </ButtonLink>

      {/* Invitation text with slide-up animation */}
      {inviteeId && (
        <p
          className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 animate-slide-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <span className="inline-block hero-invite-label">
            Estás invitado/a
          </span>
        </p>
      )}

      {/* Main title with enhanced gradient and animation */}
      <div
        className="text-5xl md:text-7xl font-bold pb-4 animate-slide-in-up flex flex-col items-center"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        <span
          className={`block hero-gradient-text ${sweetHipsterFont.className} text-9xl leading-none`}
        >
          Birthday
        </span>
        <span
          className={`mt-[-0.45em] block hero-gradient-text-row ${sweetHipsterFont.className} text-6xl leading-tight`}
        >
          Party
        </span>
      </div>

      {/* Description with fade-in animation */}
      <p
        className="px-12 text-lg text-muted max-w-md mx-auto leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.4s", animationFillMode: "both" }}
      >
        {inviteeId ? inviteeMessage : alternativeInviteeMessage}
      </p>

      <div className="flex justify-center items-center gap-3 mt-4">
        <div className="w-[160px]">
          <span
            className={`hero-gradient-text ${sweetHipsterFont.className} text-9xl leading-none`}
          >
            Eve
          </span>
          <div className="flex justify-center items-baseline gap-0.5 text-muted">
            <span>x</span>
            <span className="block text-foreground/90 animate-gradient-shift transition-transform cursor-default text-xl font-medium tracking-wide">Años</span>
          </div>
        </div>
        <span className={`block text-foreground/85 animate-gradient-shift transition-transform cursor-default text-4xl ${playfairDisplay.className}`}>
          Y
        </span>
        <div className="w-[160px]">
          <span
            className={`hero-gradient-text ${sweetHipsterFont.className} text-9xl leading-none`}
          >
            Ivan
          </span>
          <div className="flex justify-center items-baseline gap-0.5 text-muted">
            <span>x</span>
            <span className="block text-foreground/90 animate-gradient-shift transition-transform cursor-default text-xl font-medium tracking-wide">Años</span>
          </div>
        </div>
      </div>

      {/* Unique Invitation Tip */}
      <div
        className="mt-8 animate-slide-in-up mx-auto"
        style={{
          animationDelay: "0.25s",
          animationFillMode: "both",
          width: "fit-content",
        }}
      >
        <div className="rounded-xl bg-linear-to-r from-primary/15 via-accent/10 to-primary/12 border border-accent/20 shadow-sm backdrop-blur-[1px] p-3 mb-4">
          <div className="flex items-center gap-2 text-left">
            <AlertCircle className="h-4 w-4 text-accent shrink-0" strokeWidth={2} />
            <span className="text-xs sm:text-sm text-foreground/90">
              <strong className="font-semibold text-accent"></strong>
              {inviteeId ? uniqueInvitationTip : alternativeInvitationTip}
            </span>
          </div>
        </div>
      </div>
      {!inviteeId && (
        <div className="flex flex-col items-center justify-center mt-12">
          <div
            className="inline-flex flex-col gap-4 items-center justify-center w-50 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative animate-scale-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
            <ArrowBigDown className="w-12 h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />
            <ButtonLink to={invitationLink} description="Go to invitation">
              <div
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative shadow-2xl animate-scale-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                <div className="absolute inset-2 rounded-full bg-linear-to-br from-accent/35 to-primary/40 ring-1 ring-border/30" />
                <CakeSlice
                  className="w-12 h-12 text-accent-foreground relative z-50"
                  strokeWidth={2}
                />
              </div>
            </ButtonLink>
            <p className="text-primary text-xs font-medium">
              {alternativeInvitationLinkText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
