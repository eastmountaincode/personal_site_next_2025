'use client';

import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import ProjectLayout from '@/components/ProjectLayout';
import { webProjects } from '@/data/web-projects';

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const resolvedParams = use(params);
    const [Component, setComponent] = useState<React.ComponentType | null>(null);

    // Find the project data by slug
    const project = webProjects.find(p => p.slug === resolvedParams.slug);

    useEffect(() => {
        import(`@/content/web/${resolvedParams.slug}.tsx`)
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
            backUrl="/web"
            backText="Back to Web Projects"
        >
            <Component />
        </ProjectLayout>
    );
}