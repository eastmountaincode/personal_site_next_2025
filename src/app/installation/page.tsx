"use client";

import ProjectCard from "@/components/ProjectCard";

export default function InstallationPage() {
  const projects = [
    {
      id: 1,
      title: "Poem Car",
      description: "I covered my car in fridge poetry magnets. Anonymous poems appeared and I documented them on an Instagram acocunt..",
      image: "/images/installation/poem_car.png",
      tags: [],
      date: "2018",
      crunch: 1,
      cutoff: 0.9,
      isDetails: false,
      liveLink: "https://www.instagram.com/poem_car/"
    },
 

  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8 md:hidden">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Installation</h1>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        maxWidth: 'min(100%, 500px)' // Limits to roughly 2-column width on desktop
      }}>
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
            onViewDetails={() => console.log(`View details for ${project.title}`)}
          />
        ))}
      </div>
    </div>
  );
} 