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
  description: "We prepare properties so clients can move in immediately. Property turnover, setup and maintenance for landlords, agents, Airbnb hosts and busy families.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[#F7F1E6] font-sans text-[#17352F]">{children}</body>
    </html>
  );
}
