import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SessionProviderWrapper } from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <SessionProviderWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
