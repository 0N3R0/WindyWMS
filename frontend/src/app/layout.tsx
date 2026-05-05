import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WindyWMS — System Zarządzania Magazynem",
  description: "Profesjonalny system zarządzania przesyłkami i logistyką magazynową.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${manrope.variable} h-full antialiased overflow-y-scroll`}
    >
      <body className="min-h-full flex flex-col mx-0!">{children}</body>
    </html>
  );
}