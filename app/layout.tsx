import type { Metadata } from "next";
import { Toast } from "@heroui/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SparklesBackground, GradientBackground } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invitee",
  description: "Invitee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" data-theme="dark" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <SpeedInsights />
        <Toast.Container placement="bottom" />
        <SparklesBackground />
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
