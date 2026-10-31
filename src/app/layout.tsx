import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';

import { SITE_URL } from '@/lib/config';
import { SITE_CONFIG } from '@/lib/site-config';

const siteTitle = SITE_CONFIG.metadataTitle || `${SITE_CONFIG.siteName} · Contratación Pública`;
const siteDescription = SITE_CONFIG.metadataDescription || SITE_CONFIG.siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  keywords: SITE_CONFIG.metadataKeywords.length ? SITE_CONFIG.metadataKeywords : ['licitaciones', 'contratación pública', 'adjudicaciones', 'datos abiertos'],
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: `${SITE_CONFIG.siteName} · Licitaciones y alertas de contratación` }],
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: SITE_CONFIG.siteName,
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased bg-white text-slate-800 min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-950 relative">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  );
}
