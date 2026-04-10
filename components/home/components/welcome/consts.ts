import localFont from "next/font/local";
import {
  Lavishly_Yours,
  MonteCarlo,
  Stalemate,
} from "next/font/google";

export const inviteeMessage =
  "Te invitamos a celebrar con nosotros nuestro cumpleaños."; // TODO: Change this
export const alternativeInviteeMessage =
  "Para poder participar, es necesario solicitar tu invitación.";

export const uniqueInvitationTip = "Esta invitación es única para cada persona";
export const alternativeInvitationTip =
  "Cada solicitud será confirmada de forma individual.";

export const alternativeInvitationLinkText = "Solicita tu invitación aquí";

export const invitationLink =
  "https://wa.me/5493814025206?text=Hola%2C%20quisiera%20solicitar%20una%20invitaci%C3%B3n%20para%20el%20evento.%20%C2%A1Gracias!"; // TODO: Change this

export const sweetHipsterFont = localFont({
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

export const stalemate = Stalemate({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-playfair-display",
  display: "swap",
});

export const lavishlyYours = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-playfair-display",
  display: "swap",
});

export const monteCarlo = MonteCarlo({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-playfair-display",
  display: "swap",
});
