import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title:
    'Stratco — Strategic Creative & Commercial Production House | Making Brands Unforgettable',
  description:
    'Stratco Limited is a Kampala-based strategic creative and full-scale production company. We turn market strategy into integrated campaigns, television commercials (TVCs), brand systems, and live broadcast productions.',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
