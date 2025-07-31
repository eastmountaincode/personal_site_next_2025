// src/app/installation/[slug]/page.tsx
/* eslint-disable react-hooks/rules-of-hooks */

import { notFound } from 'next/navigation';
import ProjectLayout from '@/components/ProjectLayout';
import { installationProjects } from '@/data/installation-projects';
import path from 'path';
import { promises as fs } from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../../../mdx-components';

export default async function InstallationProjectPage({params}: { params: Promise<{ slug: string }>}) {
    const { slug } = await params;

    const project = installationProjects.find(p => p.slug === slug);
    if (!project) return notFound();

    const mdxPath = path.join(
        process.cwd(),
        'src',
        'content',
        'installation',
        `${slug}.mdx`
    );
    const mdxContent = await fs.readFile(mdxPath, 'utf8');

    return (
        <ProjectLayout
            title={project.title}
            image={project.image}
            tags={project.tags}
            date={project.date}
            liveLink={project.liveLink}
            crunch={project.crunch}
            cutoff={project.cutoff}
            backUrl="/installation"
            backText="Back to Installation Projects"
        >
            <MDXRemote source={mdxContent} components={useMDXComponents()} />
        </ProjectLayout>
    );
}
