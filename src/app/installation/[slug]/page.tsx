import { notFound } from 'next/navigation';
import ProjectLayout from '@/components/ProjectLayout';
import { installationProjects } from '@/data/installation-projects';
import path from 'path';
import { promises as fs } from 'fs';
import MDXContent from '@/components/MDXContent';

export default async function ProjectPage({params}: {params: Promise<{slug: string}>}) {
    const { slug } = await params;

    // Find the project data by slug
    const project = installationProjects.find(p => p.slug === slug);

    if (!project) {
        return notFound();
    }

    const mdxPath = path.join(process.cwd(), 'src', 'content', 'installation', `${slug}.mdx`)
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
                ? <MDXContent source={mdxContent} />
                : <div>Loading...</div>
            }
        </ProjectLayout>
    );
}