import type { Metadata } from "next";
import { Inter, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

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
import PostHogPageView from "@/components/providers/PostHogPageView";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let serverUser = null;
  if (user) {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, has_paid_bootcamp, subscription_status, subscription_tier, bootcamp_progress_day')
        .eq('id', user.id)
        .maybeSingle();

      if (profile) {
        serverUser = {
          id: user.id,
          email: user.email || "",
          isPro: profile.has_paid_bootcamp || false,
          name: profile.full_name || user.email || "Student",
          subscription_status: profile.subscription_status || undefined,
          subscription_tier: profile.subscription_tier || undefined,
          bootcamp_progress_day: profile.bootcamp_progress_day || undefined,
        };
      }
    } catch (e) {
      console.error("Failed to fetch profile in RootLayout:", e);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${caveat.variable} font-sans bg-slate-950 text-slate-100 antialiased`}>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <AuthProvider serverUser={serverUser}>
              <Suspense fallback={null}>
                <PostHogPageView />
              </Suspense>
              <Header />
              {children}
              <Footer />
            </AuthProvider>
            <Analytics />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
