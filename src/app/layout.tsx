import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://community.digintlab.com";
const SITE_NAME = "DIL Observatory";
const SITE_TITLE = "DIL Observatory — Digital Intelligence Lab | Live Map of Digital Threats, Breaches & Cyber Intelligence";
const SITE_DESCRIPTION = "The DIL Observatory gives analysts, researchers, journalists, and curious observers a live, map-based view of recent activity across the digital landscape. Explore signals from extortion, data breaches, vandalism, underground activity, threat infrastructure, vulnerability intelligence, regulatory developments, and broader cyber and digital risk — all in one shared space.";

export const viewport: Viewport = {
  themeColor: "#800000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | DIL Observatory",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    // Core Intelligence
    "digital intelligence", "cyber intelligence", "threat intelligence", "digital risk",
    "open source intelligence", "OSINT", "intelligence dashboard", "cyber monitoring",

    // Event Types
    "data breach tracker", "extortion tracker", "ransomware tracker",
    "cyber vandalism", "underground activity", "darkweb intelligence",
    "threat infrastructure", "vulnerability intelligence", "CVE tracker",
    "regulatory intelligence", "cyber incident map",

    // Platform & Features
    "live cyber threat map", "interactive threat map", "global security map",
    "intelligence feeds", "cyber event timeline", "actor tracking",
    "sector risk intelligence", "geopolitical digital risk",
    "real-time breach monitoring", "digital landscape intelligence",

    // Audience
    "security analyst tools", "threat researcher tools", "OSINT for journalists",
    "cybersecurity dashboard", "infosec intelligence", "SOC tools",
    "digital forensics tools", "incident intelligence platform",

    // Brand
    "DIL Observatory", "Digital Intelligence Lab", "digintlab", "community.digintlab.com",
  ],
  authors: [{ name: "Digital Intelligence Lab", url: SITE_URL }],
  creator: "Digital Intelligence Lab",
  publisher: "Digital Intelligence Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "DIL Observatory — Live Map of Digital Threats, Breaches & Cyber Intelligence",
    description: "A live, map-based view of digital activity across the global landscape. Explore extortion, data breaches, underground signals, vulnerability intelligence, regulatory shifts, and more — by Digital Intelligence Lab.",
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DIL Observatory — Digital Intelligence Lab live threat map and cyber intelligence dashboard",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIL Observatory — Live Map of Digital Threats & Cyber Intelligence",
    description: "Track extortion, data breaches, underground activity & more on an interactive map. By Digital Intelligence Lab.",
    creator: "@digintlab",
    site: "@digintlab",
    images: [`${SITE_URL}/og-image.png`],
  },
  category: "technology",
  classification: "Intelligence & Security",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "DIL Observatory",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#06060C",
    "msapplication-config": "none",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "DIL Observatory — Digital Intelligence Lab",
  alternateName: ["DIL Observatory", "Digital Intelligence Lab Observatory", "DIL Community Observatory"],
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires a modern web browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Live interactive global map of digital events",
    "Extortion and ransomware incident tracking",
    "Data breach monitoring and alerts",
    "Web vandalism and defacement tracking",
    "Underground and darkweb activity signals",
    "Threat infrastructure intelligence",
    "Vulnerability and CVE intelligence feeds",
    "Regulatory and policy developments tracking",
    "Cyber and digital risk indicators",
    "Actor, sector, and location attribution",
    "Event detail inspection with geocoding",
    "Regional intelligence presets",
    "Market and contextual risk indicators",
    "Multi-domain intelligence feed aggregation",
  ],
  screenshot: `${SITE_URL}/og-image.png`,
  author: {
    "@type": "Organization",
    name: "Digital Intelligence Lab",
    url: "https://digintlab.com",
  },
};

import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/svg+xml" href="/favicon-dil.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="canonical" href={SITE_URL} />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </head>
      <body className="antialiased">
        <ErrorBoundary name="DIL Observatory Core">
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
