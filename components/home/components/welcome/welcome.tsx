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
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 mb-6 relative shadow-lg animate-scale-in"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
          <div className="absolute inset-2 rounded-full bg-white/80 dark:bg-background/80" />
          <PartyPopper className="w-12 h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />
        </div>
      </ButtonLink>

      {/* Invitation text with slide-up animation */}
      {inviteeId && (
        <p
          className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 animate-slide-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <span className="inline-block animate-shimmer bg-linear-to-r from-primary via-primary/80 to-primary bg-size-[200%_100%] bg-clip-text">
            Estás invitado/a
          </span>
        </p>
      )}

      {/* Main title with enhanced gradient and animation */}
      <div
        className="text-5xl md:text-7xl font-display font-bold pb-4 animate-slide-in-up flex flex-col"
        style={{ animationDelay: "0.3s", animationFillMode: "both" }}
      >
        <span
          className={`block bg-linear-to-r from-white via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient-shift transition-transform cursor-default ${sweetHipsterFont.className} text-9xl`}
        >
          Birthday
        </span>
        <span className="mt-[-70px] block bg-linear-to-r from-white to-yellow-600 bg-clip-text text-transparent animate-gradient-shift transition-transform cursor-default text-6xl leading-normal">
          Party
        </span>
      </div>

      {/* Description with fade-in animation */}
      <p
        className="px-12 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.4s", animationFillMode: "both" }}
      >
        {inviteeId ? inviteeMessage : alternativeInviteeMessage}
      </p>

      <div className="flex justify-center items-center gap-3 mt-4">
        <div className="w-[160px]">
          <span
            className={`bg-linear-to-r from-white via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient-shift transition-transform cursor-default ${sweetHipsterFont.className} text-9xl`}
          >
            Eve
          </span>
          <div className="flex justify-center items-baseline">
            <span>x</span>
            <span className="block text-white bg-clip-text animate-gradient-shift transition-transform cursor-default text-xl">Años</span>
          </div>
        </div>
        <span className={`block text-white bg-clip-text animate-gradient-shift transition-transform cursor-default text-4xl ${playfairDisplay.className}`}>
          Y
        </span>
        <div className="w-[160px]">
          <span
            className={`bg-linear-to-r from-white via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-gradient-shift transition-transform cursor-default ${sweetHipsterFont.className} text-9xl`}
          >
            Ivan
          </span>
          <div className="flex justify-center items-baseline">
            <span>x</span>
            <span className="block text-white bg-clip-text animate-gradient-shift transition-transform cursor-default text-xl">Años</span>
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
        <div className="rounded-lg bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-3 mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0" />
            <span className="text-xs sm:text-sm text-yellow-500">
              <strong className="font-semibold text-yellow-500"></strong>
              {inviteeId ? uniqueInvitationTip : alternativeInvitationTip}
            </span>
          </div>
        </div>
      </div>
      {!inviteeId && (
        <div className="flex flex-col items-center justify-center mt-12">
          <div
            className="inline-flex flex-col gap-4 items-center justify-center w-50 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative shadow-lg animate-scale-in"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping-slow" />
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
            <ArrowBigDown className="w-12 h-12 text-primary relative z-50 animate-bounce-gentle transition-transform" />
            <ButtonLink to={invitationLink} description="Go to invitation">
              <div
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary/40 via-primary/30 to-primary/20 relative shadow-lg animate-scale-in"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                <div className="absolute inset-2 rounded-full bg-warning" />
                <CakeSlice
                  className="w-12 h-12 text-primary relative z-50"
                  color="black"
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
