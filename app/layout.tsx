import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
