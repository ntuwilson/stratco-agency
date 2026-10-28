import type { Metadata } from 'next';
import Analytics from '@/components/Analytics';
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s — Stratco',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Stratco',
    'creative agency Kampala',
    'production house Uganda',
    'TVC production',
    'live broadcast production',
    'brand strategy Uganda',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_UG',
    url: '/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

// Organisation details for Google (knowledge panel, local results)
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Stratco Limited',
  alternateName: 'Stratco',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}${OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  email: 'info@stratco.agency',
  telephone: '+256772833500',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kisakye Complex, Office 301, Bugolobi',
    addressLocality: 'Kampala',
    addressCountry: 'UG',
  },
  areaServed: { '@type': 'Country', name: 'Uganda' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@200;300;400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
