"use client";

import ProjectCard from "@/components/ProjectCard";
import { webProjects } from "@/data/web-projects";

export default function WebPage() {
  const projects = webProjects;

  return (
    <div className="p-6 md:p-8">
      {/* Header - mobile only */}
      <div className="mb-8 md:hidden">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Web Development</h1>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
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
                    window.location.href = `/web/${project.slug}`;
                }
            }}
          />
        ))}
      </div>
    </div>
  );
} 