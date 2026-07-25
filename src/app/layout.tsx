import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";
import { absoluteUrl, businessName, localBusinessJsonLd, pageMetadata } from "@/lib/seo";
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
  metadataBase: new URL(absoluteUrl("/")),
  ...pageMetadata({
    title: "Care & Flair | Property Reset, Cleaning & Maintenance in Bromley",
    description:
      "24-72h property resets, cleaning and minor maintenance for landlords, agents, homeowners and hosts across Bromley, South East London, Kent, Medway and Rochester.",
  }),
  applicationName: businessName,
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full bg-[#f5ecdc] font-sans text-[#14241F]">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <AnalyticsEvents />
        {children}
      </body>
    </html>
  );
}
