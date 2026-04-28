import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "The Rogue Puffin",
  description: "Teaching you what school didn't.",
  // Use metadataBase for absolute URLs in OG tags
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://theroguepuffin.vercel.app"
  ),
  openGraph: {
    title: "The Rogue Puffin | Learning Mastery",
    description: "Apply verifiable cognitive science to instantly increase your understanding, reading speed and recall.",
    url: "/",
    siteName: "The Rogue Puffin",
    images: [
      {
        url: "/assets/premium-logo.png",
        width: 1200,
        height: 630,
        alt: "The Rogue Puffin - Learning Mastery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rogue Puffin | Learning Mastery",
    description: "Apply verifiable cognitive science to instantly increase your understanding, reading speed and recall.",
    images: ["/assets/premium-logo.png"],
  },
};

import { Header } from "@/components/layout/Header";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-slate-100 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
