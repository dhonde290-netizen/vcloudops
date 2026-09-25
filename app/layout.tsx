/**
 * Root layout — wraps every page in the site.
 *
 * What lives here:
 * - <html> and <body> with base metadata
 * - Skip-to-content link for keyboard accessibility
 * - Shared Navbar and Footer
 * - Tailwind dark mode class on <html> (uses prefers-color-scheme via CSS)
 *
 * DO NOT add page-specific content here. Keep this thin.
 */

import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// ─── Site-wide SEO defaults ────────────────────────────────────────────────
// Each page can override individual fields by exporting its own `metadata`.
export const metadata: Metadata = {
  // Template: "Page Title | AWS Cloud Club VIT Pune"
  title: {
    default: 'AWS Cloud Club — VIT Pune',
    template: '%s | AWS Cloud Club VIT Pune',
  },
  description:
    'The official AWS Cloud Club at Vishwakarma Institute of Technology, Pune. ' +
    'Workshops, events, setup guides, and more — helping VIT students build cloud skills.',
  keywords: ['AWS', 'Cloud', 'VIT Pune', 'Cloud Club', 'workshops', 'Amazon Web Services'],
  authors: [{ name: 'AWS Cloud Club VIT Pune' }],
  // Update this when the site goes live on its real domain
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'AWS Cloud Club VIT Pune',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Viewport / theme colour ───────────────────────────────────────────────
export const viewport: Viewport = {
  // AWS orange as the browser chrome colour on mobile
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// ─── Layout ────────────────────────────────────────────────────────────────

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        {/*
         * Skip-to-content link — visually hidden until focused.
         * Required for keyboard and screen-reader accessibility (WCAG 2.1 AA).
         * The 'main-content' id must exist on the <main> element of every page.
         */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        {/* Pages render inside this <main>. The id is required for the skip link. */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
