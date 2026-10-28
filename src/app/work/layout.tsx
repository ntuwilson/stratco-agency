import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/config/site';

const description =
  'Selected Stratco projects: national campaigns, documentaries, live broadcast summits and brand rollouts across Uganda.';

// /work/page.tsx is a client component, so its metadata lives here.
// openGraph replaces the root one rather than merging, so it is complete here.
export const metadata: Metadata = {
  title: 'Work',
  description,
  alternates: { canonical: '/work/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_UG',
    url: '/work/',
    title: 'Work — Stratco',
    description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
