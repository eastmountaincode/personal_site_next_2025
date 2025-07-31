'use client';

import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import ProjectLayout from '@/components/ProjectLayout';
import { installationProjects } from '@/data/installation-projects';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = use(params);
    const [Component, setComponent] = useState<React.ComponentType | null>(null);

    // Find the project data by slug
    const project = installationProjects.find(p => p.slug === resolvedParams.slug);

    useEffect(() => {
        import(`@/content/installation/${resolvedParams.slug}.tsx`)
            .then(module => setComponent(() => module.default))
            .catch(() => setComponent(null));
    }, [resolvedParams.slug]);

    if (!project) {
        return notFound();
    }

    if (Component === null) {
        return notFound();
    }

    if (!Component) {
        return <div className="max-w-4xl mx-auto p-6 md:p-8">Loading...</div>;
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
            <Component />
        </ProjectLayout>
    );
}