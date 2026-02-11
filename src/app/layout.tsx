import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { VersionMismatchDetector } from "../components/VersionMismatchDetector";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skew Test",
  description: "Minimal app to test version mismatch detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <VersionMismatchDetector />
        {children}
      </body>
    </html>
  );
}
