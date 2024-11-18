import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "freire.app",
  description:
    "Gestão eficiente, futuro brilhante. Simplifique hoje para alcançar o amanhã. Uma plataforma inteligente para gestão acadêmica: organize e acompanhe o desempenho de estudantes, professores e coordenadores com eficiência, simplificando a administração universitária.",
  openGraph: {
    title: "freire.app",
    description:
      "Gestão eficiente, futuro brilhante. Simplifique hoje para alcançar o amanhã. Uma plataforma inteligente para gestão acadêmica: organize e acompanhe o desempenho de estudantes, professores e coordenadores com eficiência, simplificando a administração universitária.",
    images: [
      {
        url: "/public/recife.jpg",
        width: 1280,
        height: 720,
        alt: "freire.app logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@freireapp",
    title: "freire.app",
    description:
      "Gestão eficiente, futuro brilhante. Simplifique hoje para alcançar o amanhã. Uma plataforma inteligente para gestão acadêmica: organize e acompanhe o desempenho de estudantes, professores e coordenadores com eficiência, simplificando a administração universitária.",
    images: "/public/recife.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased dark select-none`}
      >
        {children}
      </body>
    </html>
  );
}
