import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'WikiScroll - Discover Wikipedia Articles Instantly',
    template: '%s | WikiScroll'
  },
  description: 'Explore Wikipedia articles with infinite scroll, search functionality, and category filtering. Discover knowledge like never before with our modern, TikTok-inspired interface.',
  keywords: ['wikipedia', 'knowledge', 'articles', 'search', 'infinite scroll', 'education', 'learning', 'encyclopedia'],
  authors: [{ name: 'WikiScroll Team' }],
  creator: 'WikiScroll',
  publisher: 'WikiScroll',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wikiscroll.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wikiscroll.app',
    title: 'WikiScroll - Discover Wikipedia Articles Instantly',
    description: 'Explore Wikipedia articles with infinite scroll, search functionality, and category filtering.',
    siteName: 'WikiScroll',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WikiScroll - Discover Wikipedia Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WikiScroll - Discover Wikipedia Articles Instantly',
    description: 'Explore Wikipedia articles with infinite scroll, search functionality, and category filtering.',
    images: ['/og-image.jpg'],
    creator: '@wikiscroll',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-16x16.svg" sizes="16x16" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="32x32" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4669482504741834"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "WikiScroll",
              "description": "Explore Wikipedia articles with infinite scroll, search functionality, and category filtering.",
              "url": "https://wikiscroll.app",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className="bg-white font-sans">
        {children}
      </body>
    </html>
  )
}
