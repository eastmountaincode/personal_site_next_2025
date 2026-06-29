"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectGrid, {
  getProjectGridMaxWidth,
  getProjectGridMinCardWidth,
} from "@/components/ProjectGrid";
import { webOverviewProjects } from "@/data/web-overview-projects";

export default function WebPage() {
  const projects = webOverviewProjects;
  const maxWidth = getProjectGridMaxWidth(projects);
  const minCardWidth = getProjectGridMinCardWidth(projects);

  return (
    <div className="p-6 md:p-8">
      {/* Header - mobile only */}
      <div className="mb-8 md:hidden">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Web Development</h1>
      </div>

      {/* Projects Grid */}
      <ProjectGrid maxWidth={maxWidth} minCardWidth={minCardWidth}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            featuredLinks={project.featuredLinks}
            image={project.image}
            tags={project.tags}
            date={project.date}
            crunch={project.crunch}
            cutoff={project.cutoff}
            isDetails={project.isDetails}
            liveLink={project.liveLink}
            status={project.status}
            onViewDetails={() => {
                if (project.slug) {
                    window.location.href = `/web/${project.slug}`;
                }
            }}
          />
        ))}
      </ProjectGrid>
    </div>
  );
} 
