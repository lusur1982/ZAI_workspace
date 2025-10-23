import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header-optimized";
import { Footer } from "@/components/Footer";

// Use Inter font which is faster and self-hosted
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CM Crypto Miners - Premium Cryptocurrency Mining Hardware",
  description: "Shop the best cryptocurrency mining hardware at CM. ASIC miners, GPU rigs, and expert support for profitable mining.",
  keywords: ["crypto mining", "ASIC miners", "GPU mining", "cryptocurrency hardware", "Bitcoin mining", "Ethereum mining"],
  authors: [{ name: "CM Crypto Miners" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CM Crypto Miners | Premium Mining Hardware",
    description: "Your trusted partner for cryptocurrency mining hardware. We offer the latest ASIC and GPU miners with expert support.",
    url: "https://cmminers.com",
    siteName: "CM Crypto Miners",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CM Crypto Miners",
    description: "Premium cryptocurrency mining hardware for maximum profitability",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body
        className={`${inter.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}