import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScrollProvider } from "@/components/chrome/smooth-scroll-provider";
import { ScrollProgress } from "@/components/chrome/scroll-progress";
import { Starfield } from "@/components/chrome/starfield";
import { PageTransition } from "@/components/motion/page-transition";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SEO_TITLE = `${SITE_CONFIG.name} | Software engineer`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SEO_TITLE,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "software engineer",
    "freelance software engineer",
    "Angular",
    "Node.js",
    "MongoDB",
    "AWS",
    "Mumbai",
    "Pune",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SEO_TITLE,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SITE_CONFIG.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        inter.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Fixed, behind everything. Kept outside the scroll provider on purpose. */}
        <Starfield />
        <SmoothScrollProvider>
          <ScrollProgress />
          <SiteHeader />
          <div className="flex-1">
            <PageTransition>{children}</PageTransition>
          </div>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}