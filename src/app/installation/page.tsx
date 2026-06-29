"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectGrid, {
    getProjectGridMinCardWidth,
} from "@/components/ProjectGrid";
import { installationOverviewProjects } from "@/data/installation-overview-projects";

export default function InstallationPage() {
    const projects = installationOverviewProjects;
    const minCardWidth = getProjectGridMinCardWidth(projects);

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-8 md:hidden">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Installation</h1>
            </div>

            {/* Projects Grid */}
            <ProjectGrid minCardWidth={minCardWidth}>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        date={project.date}
                        crunch={project.crunch}
                        cutoff={project.cutoff}
                        isDetails={project.isDetails}
                        liveLink={project.liveLink}
                        onViewDetails={() => {
                            if (project.slug) {
                                window.location.href = `/installation/${project.slug}`;
                            }
                        }}
                    />
                ))}
            </ProjectGrid>
        </div>
    );
} 
