import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dagar om Lagar 2025',
  description: 'Ett juridiskt symposium som utforskar lagar och samhälle',
  keywords: ['juridik', 'lagar', 'symposium', 'streaming', 'live'],
  authors: [{ name: 'DoL 2025 Team' }],
  openGraph: {
    title: 'Dagar om Lagar 2025',
    description: 'Ett juridiskt symposium som utforskar lagar och samhälle',
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Dagar om Lagar',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dagar om Lagar 2025',
    description: 'Ett juridiskt symposium som utforskar lagar och samhälle',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="se" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Space background with stars and nebulas */}
        <div className="space-background" aria-hidden="true" />

        {/* Shooting stars */}
        <div className="shooting-stars" aria-hidden="true">
          <div className="shooting-star" />
          <div className="shooting-star" />
          <div className="shooting-star" />
          <div className="shooting-star" />
          <div className="shooting-star" />
        </div>

        {children}
      </body>
    </html>
  );
}
