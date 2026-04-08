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
    <div className="text-center relative py-8 sm:py-10 md:py-12">
      {/* Icon with enhanced animations */}
      <ButtonLink
        enable={inviteeId !== null}
        to="/login"
        description="Go to login"
      >
        <div
          className="inline-flex items-center justify-center w-20 h-20 sm:w-21 sm:h-21 md:w-24 md:h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 mb-4 sm:mb-5 md:mb-6 relative shadow-2xl animate-scale-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
          <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-surface/85 backdrop-blur-[2px] ring-1 ring-border/40" />
          <PartyPopper className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />
        </div>
      </ButtonLink>

      {/* Invitation text with slide-up animation */}
      {inviteeId && (
        <p
          className="text-primary uppercase tracking-[0.15em] sm:tracking-[0.28em] md:tracking-[0.3em] text-sm sm:text-base font-semibold mb-3 sm:mb-4 animate-fade-in px-3 max-w-full text-balance"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          Estás invitado/a
        </p>
      )}

      {/* Main title with enhanced gradient and animation */}
      <div
        className="text-4xl sm:text-5xl md:text-7xl font-bold pb-3 sm:pb-3 md:pb-4 animate-slide-in-up flex flex-col items-center"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        <span
          className={`block hero-gradient-text ${sweetHipsterFont.className} text-8xl leading-none`}
        >
          Birthday
        </span>
        <span
          className={`mt-[-32px] sm:mt-[-48px] md:mt-[-60px] block hero-gradient-text-row text-5xl leading-tight`}
        >
          Party
        </span>
      </div>

      {/* Description with fade-in animation */}
      <p
        className="px-5 sm:px-9 md:px-12 text-base sm:text-lg text-muted max-w-md mx-auto leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.4s", animationFillMode: "both" }}
      >
        {inviteeId ? inviteeMessage : alternativeInviteeMessage}
      </p>

      <div className="flex justify-center items-center gap-2 sm:gap-2.5 md:gap-3 mt-3 sm:mt-3.5 md:mt-4">
        <div className="w-[min(32vw,8.75rem)] sm:w-36 md:w-[160px]">
          <span
            className={`hero-gradient-text ${sweetHipsterFont.className} text-8xl leading-none`}
          >
            Eve
          </span>
          <div className="flex justify-center items-baseline gap-0.5 text-muted">
            <span>x</span>
            <span className="block text-foreground/90 animate-gradient-shift transition-transform cursor-default text-base sm:text-lg md:text-xl font-medium tracking-wide">Años</span>
          </div>
        </div>
        <span className={`block text-foreground/85 animate-gradient-shift transition-transform cursor-default text-3xl md:text-4xl ${playfairDisplay.className}`}>
          &
        </span>
        <div className="w-[min(32vw,8.75rem)] sm:w-36 md:w-[160px]">
          <span
            className={`hero-gradient-text ${sweetHipsterFont.className} text-8xl leading-none`}
          >
            Ivan
          </span>
          <div className="flex justify-center items-baseline gap-0.5 text-muted">
            <span>x</span>
            <span className="block text-foreground/90 animate-gradient-shift transition-transform cursor-default text-base sm:text-lg md:text-xl font-medium tracking-wide">Años</span>
          </div>
        </div>
      </div>

      {/* Unique Invitation Tip */}
      <div
        className="mt-5 sm:mt-6 md:mt-8 animate-slide-in-up mx-auto"
        style={{
          animationDelay: "0.25s",
          animationFillMode: "both",
          width: "fit-content",
        }}
      >
        <div className="rounded-xl bg-linear-to-r from-primary/15 via-accent/10 to-primary/12 border border-accent/20 shadow-sm backdrop-blur-[1px] p-3 sm:p-3 mb-3 sm:mb-4 mx-1 sm:mx-0">
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
        <div className="flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12">
          <div
            className="inline-flex flex-col gap-3 sm:gap-3 md:gap-4 items-center justify-center w-50 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative animate-scale-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
            <ArrowBigDown className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />
            <ButtonLink to={invitationLink} description="Go to invitation">
              <div
                className="inline-flex items-center justify-center w-20 h-20 sm:w-21 sm:h-21 md:w-24 md:h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative shadow-2xl animate-scale-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                <div className="absolute inset-1.5 sm:inset-2 rounded-full bg-linear-to-br from-accent/35 to-primary/40 ring-1 ring-border/30" />
                <CakeSlice
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-accent-foreground relative z-50"
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
