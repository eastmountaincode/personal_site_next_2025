import { notFound } from 'next/navigation';
import ProjectLayout from '@/components/ProjectLayout';
import { installationProjects } from '@/data/installation-projects';
import path from 'path';
import { promises as fs } from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '../../../../mdx-components';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    // Find the project data by slug
    const project = installationProjects.find(p => p.slug === resolvedParams.slug);

    if (!project) {
        return notFound();
    }

    const mdxPath = path.join(process.cwd(), 'src', 'content', 'installation', `${resolvedParams.slug}.mdx`)
    let mdxContent = null;
    try {
        mdxContent = await fs.readFile(mdxPath, 'utf8');
    } catch (error) {
        console.error(`Error reading MDX file: ${error}`);
        mdxContent = null;
    }

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
            {mdxContent
                ? <MDXRemote source={mdxContent} components={useMDXComponents()} />
                : <div>Loading...</div>
            }
        </ProjectLayout>
    );
}