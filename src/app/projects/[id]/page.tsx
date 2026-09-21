import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudy } from '../../../components/pages/CaseStudy';
import { getProject, PROJECTS } from '../../../data/portfolio';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(project => ({ id: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) notFound();

  return <CaseStudy project={project} />;
}
