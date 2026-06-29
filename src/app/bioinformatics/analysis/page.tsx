"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectGrid, {
    getProjectGridMaxWidth,
    getProjectGridMinCardWidth,
} from "@/components/ProjectGrid";
import { bioinformaticsProjects } from "@/data/bioinformatics-projects";

export default function BioinformaticsAnalysisPage() {
    const projects = bioinformaticsProjects;
    const maxWidth = getProjectGridMaxWidth(projects);
    const minCardWidth = getProjectGridMinCardWidth(projects);

    return (
        <div className="p-6 md:p-8">
            <div className="mb-8 md:hidden">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Analysis</h1>
            </div>

            <ProjectGrid maxWidth={maxWidth} minCardWidth={minCardWidth}>
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
                    />
                ))}
            </ProjectGrid>
        </div>
    );
}
