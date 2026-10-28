import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/data/stratcoData';
import { SITE_URL } from '@/config/site';
import KononenkoProjectView from '@/components/KononenkoProjectView';

function findProject(slug: string) {
  return CASE_STUDIES.find((p) => p.slug === slug || p.id === slug);
}

function trimDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  return `${text.slice(0, text.lastIndexOf(' ', max - 1))}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};

  // Pages reachable by both id and slug share the slug URL as canonical
  const url = `/work/${project.slug}/`;
  const description = trimDescription(project.summary);
  return {
    title: { absolute: `${project.shortName} — Stratco` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: 'Stratco',
      locale: 'en_UG',
      url,
      title: `${project.shortName} — Stratco`,
      description,
      images: [{ url: project.image, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.shortName} — Stratco`,
      description,
      images: [project.image],
    },
  };
}

export function generateStaticParams() {
  const slugs = new Set<string>();
  CASE_STUDIES.forEach((project) => {
    slugs.add(project.slug);
    slugs.add(project.id);
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  const caseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.shortName,
    description: project.summary,
    url: `${SITE_URL}/work/${project.slug}/`,
    image: `${SITE_URL}${project.image}`,
    dateCreated: project.timeline,
    creator: { '@type': 'Organization', name: 'Stratco Limited', url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd) }}
      />
      <KononenkoProjectView project={project} allProjects={CASE_STUDIES} />
    </>
  );
}
