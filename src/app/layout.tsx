import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RCN Universe — Explore the Digital Universe of RCN",
  description:
    "An interactive 3D space exploration experience. Travel between planets to discover the projects, services, team and universe of RCN.",
  keywords: [
    "RCN",
    "portfolio",
    "three.js",
    "webgl",
    "creative developer",
    "interactive",
    "space",
  ],
  authors: [{ name: "RCN" }],
  openGraph: {
    title: "RCN Universe",
    description: "Explore the Digital Universe of RCN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
