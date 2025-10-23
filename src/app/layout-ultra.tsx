import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "CM Crypto Miners - Premium Cryptocurrency Mining Hardware",
  description: "Shop the best cryptocurrency mining hardware at CM. ASIC miners, GPU rigs, and expert support for profitable mining.",
};

export default function UltraFastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}