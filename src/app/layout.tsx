import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const openSans = Source_Sans_3({
  weight: ["200", "300", "400", "600", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Poorman Tools",
  description: "Your one stop tools for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark ${openSans.className}`}>{children}</body>
    </html>
  );
}
