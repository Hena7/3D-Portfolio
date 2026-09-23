import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/ui/Navbar";
import { TelemetryHUD } from "@/components/ui/TelemetryHUD";

export const metadata: Metadata = {
  title: "Henock M. — Full Stack Developer",
  description:
    "Portfolio of Henock M., a passionate Full Stack Developer specializing in React, Next.js, and Spring Boot. Building exceptional digital products.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Spring Boot",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Henock M." }],
  openGraph: {
    title: "Henock M. — Full Stack Developer",
    description: "Building exceptional digital products.",
    type: "website",
    url: "https://henockm.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henock M. — Full Stack Developer",
    description: "Building exceptional digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Background layers */}
        <div className="grid-bg" aria-hidden="true" />
        <div className="noise" aria-hidden="true" />

        {/* Ambient glow orbs (Zero Purple: Cyan, Emerald, Amber) */}
        <div
          className="glow-orb"
          style={{
            width: "600px",
            height: "600px",
            top: "-200px",
            left: "-100px",
            background: "rgba(0, 212, 255, 0.08)",
          }}
          aria-hidden="true"
        />
        <div
          className="glow-orb"
          style={{
            width: "550px",
            height: "550px",
            bottom: "10%",
            right: "-150px",
            background: "rgba(0, 245, 160, 0.08)",
          }}
          aria-hidden="true"
        />
        <div
          className="glow-orb"
          style={{
            width: "400px",
            height: "400px",
            top: "45%",
            left: "-150px",
            background: "rgba(255, 184, 0, 0.04)",
          }}
          aria-hidden="true"
        />

        {/* Core UI */}
        <SmoothScrollProvider />
        <ScrollProgress />
        <Navbar />
        <TelemetryHUD />

        {/* Page Content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
