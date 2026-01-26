import type { Metadata } from "next";
import { SparklesBackground, GradientBackground } from "@/components";
import "./globals.css";
import { Toast } from "@heroui/react";

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
        <Toast.Container placement="bottom" />
        <SparklesBackground />
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
