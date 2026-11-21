import type { Metadata, Viewport } from "next";
import "@fontsource/im-fell-english-sc";
import "@fontsource/im-fell-english";
import "@fontsource/alegreya/400.css";
import "@fontsource/alegreya/500.css";
import "@fontsource/alegreya/700.css";
import "@fontsource/alegreya/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trivia Quest",
  description: "Roll the dice, travel the map, answer trivia with friends — in English, Español or Deutsch.",
};

export const viewport: Viewport = {
  themeColor: "#2c190e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
