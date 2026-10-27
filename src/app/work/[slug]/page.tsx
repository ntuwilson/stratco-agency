import React from 'react';
import { notFound } from 'next/navigation';
import { CASE_STUDIES } from '@/data/stratcoData';
import KononenkoProjectView from '@/components/KononenkoProjectView';

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
  const project = CASE_STUDIES.find((p) => p.slug === slug || p.id === slug);

  if (!project) {
    notFound();
  }

  return <KononenkoProjectView project={project} allProjects={CASE_STUDIES} />;
}
