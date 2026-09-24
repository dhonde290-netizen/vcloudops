import type { NextConfig } from 'next';

/**
 * Security headers applied to every response.
 * These protect against common web vulnerabilities.
 * See: https://nextjs.org/docs/app/building-your-application/configuring/headers
 */
const securityHeaders = [
  // Prevent the page from being embedded in an <iframe> on another site (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stop browsers from guessing the content type (MIME sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Only send the origin when navigating to a different site (no full URL leak)
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restrict browser APIs (e.g., no microphone, no camera, no geolocation)
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  /**
   * Content Security Policy (CSP)
   * Adjust 'script-src' and 'frame-src' in Phase 2 when YouTube embeds are added.
   * Keep this as strict as possible to reduce XSS risk.
   */
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js needs 'unsafe-eval' in dev; remove it in production manually or via env
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      // Phase 3: add Supabase URL here when queries feature is built
      "frame-src 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Treat all TypeScript errors as build errors (enforces strict TS)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Optimise images with WebP/AVIF (built-in next/image support)
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
