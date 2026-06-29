"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectGrid, {
    getProjectGridMinCardWidth,
} from "@/components/ProjectGrid";
import { bioinformaticsOverviewProjects } from "@/data/bioinformatics-overview-projects";

export default function BioinformaticsPage() {
    const projects = bioinformaticsOverviewProjects;
    const minCardWidth = getProjectGridMinCardWidth(projects);

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-8 md:hidden">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Bioinformatics</h1>
            </div>

            {/* Projects Grid */}
            <ProjectGrid minCardWidth={minCardWidth}>
                {projects.map((project) => (
                    <ProjectCard
                        key={`${project.title}-${project.date}`}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        date={project.date}
                        crunch={project.crunch}
                        cutoff={project.cutoff}
                        isDetails={project.isDetails}
                        liveLink={project.liveLink}
                        status={project.status}
                    />
                ))}
            </ProjectGrid>

            {/* Call to Action */}
            {/* <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Interested in Collaboration?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new bioinformatics challenges and 
            research opportunities. Feel free to reach out if you'd like to collaborate.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Get in Touch
          </button>
        </div>
      </div> */}
        </div>
    );
} 
