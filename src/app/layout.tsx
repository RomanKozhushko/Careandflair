import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CARE & FLAIR | Property Turnover & Maintenance Specialist",
  description: "Property resets for landlords, agents, new homeowners, sellers and hosts across Bromley, Rochester, Medway and Kent.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[#f5ecdc] font-sans text-[#14241F]">{children}</body>
    </html>
  );
}
