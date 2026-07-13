import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "N'Zassa Skin - Pensé en Afrique, pour les peaux africaines",
  description: "La première application d'IA pour analyser, suivre et améliorer l'apparence des peaux africaines et métissées avec des recommandations personnalisées.",
  keywords: "peau africaine, soin peau, analyse IA, skincare, cosmétique africain, hyperpigmentation, teint uniforme",
  openGraph: {
    title: "N'Zassa Skin",
    description: "Pensé en Afrique, pour les peaux africaines",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
