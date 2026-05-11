import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowBiz Plateforme",
  description: "Plateforme intelligente de gestion, pilotage et développement d’entreprise.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}


