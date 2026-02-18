import "@/styles/globals.css";
import Header from "@/components/general/header";
import Footer from "@/components/general/footer";
import type { Metadata } from "next";
import {
  Atkinson_Hyperlegible_Next,
  JetBrains_Mono,
  Fira_Sans,
} from "next/font/google";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
});

const fira = Fira_Sans({
  weight: "700",
  variable: "--font-fira-sans",
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Syntype",
  description: "A simple and minimal typing test for programmers.",
  metadataBase: new URL("https://syntype.arvingarcia.com"),
  applicationName: "Syntype",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Typing Test",
    "Programming Typing Test",
  ],
  authors: [{ name: "Arvin Garcia", url: "https://arvingarcia.com" }],
  creator: "Arvin Garcia",
  publisher: "Arvin Garcia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-color-theme={theme} style={themeColors}>
      <body
        className={`${atkinson.variable} ${jetBrainsMono.variable} ${fira.variable}`}
      >
          <Header />
          <main className="wrapper-primary">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
