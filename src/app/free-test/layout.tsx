import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free 3-Minute Speed Reading Test | The Rogue Puffin",
    description: "Measure your reading speed in words per minute (WPM) and baseline your comprehension score with our free cognitive speed reading test.",
    alternates: {
        canonical: "/free-test",
    },
};

export default function FreeTestLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
