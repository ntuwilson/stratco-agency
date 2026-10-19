import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:
    'Stratco — Corporate Branding & Executive Events Coverage | Making Brands Unforgettable',
  description:
    'Stratco Limited is Kampala’s premier corporate branding and executive events coverage agency. We architect unforgettable brand identities, physical signage, fleet livery, and multi-camera event productions across Africa and beyond.',
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
          href="https://fonts.googleapis.com/css2?family=Geist:wght@200;300;400;500&family=Inter:wght@300;400;500;600&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
