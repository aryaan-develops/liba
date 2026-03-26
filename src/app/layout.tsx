import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

import NextAuthSessionProvider from "@/context/NextAuthSessionProvider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Liba",
  description: "Connect and share your stories with the community.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${outfit.variable} antialiased`}>
        <NextAuthSessionProvider>
          <AuthProvider>{children}</AuthProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

