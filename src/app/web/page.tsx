"use client";

import ProjectCard from "@/components/ProjectCard";

//a browser-based web game to promote an artist’s new single, featuring drag-and-drop interaction,
//proximity-triggered scenes, and dynamic audio.
//• Implemented mobile-friendly controls, pinch-zoom, and live camera integration

export default function WebPage() {
  const projects = [
    {
        id: 1,
        title: "Doom Meeting",
        description: "A web based live video feed app integrated into a live performance. Prompted by the performer, users access the site via a QR code, which allows them to project their video feed onto a projected display page.",
        image: "/images/web/doom_meeting.jpg",
        tags: ["Next.js", "TypeScript", "Tailwind", "Jotai", "LiveKit"],
        date: "2025",
        crunch: 1,
        cutoff: 0.3,
        isDetails: false,
      },
    {
      id: 2,
      title: "Diorama Web Game",
      description: "A web game to promote an artist’s new single, featuring drag-and-drop interaction, proximity-triggered scenes, and dynamic audio.",
      image: "/images/web/diorama_header.png",
      tags: ["React", "TypeScript", "Tailwind", "Jotai", "Web Audio API"],
      date: "2025",
      crunch: 1,
      cutoff: 0.65,
      isDetails: false,
      liveLink: "https://www.lailasmith.com/"
    },
    {
      id: 3,
      title: "YouTube Sequencer",
      description: "A full-stack web app that re-purposes YouTube into a drum sequencer, allowing users to compose, share, and remix rhythm patterns.",
      image: "/images/web/yts_header.png",
      tags: ["React", "TypeScript", "AWS EC2", "GraphQL", "PostgreSQL", "Terraform"],
      date: "2025",
      crunch: 1,
      cutoff: 0.8,
      isDetails: false,
      liveLink: "https://youtubesequencer.com/"
    },
    {
        id: 8,
        title: "Sandwich Alignment Game",
        description: "Not just a game about putting sandwiches on an alignment grid - it's a tool for introspection.",
        image: "/images/web/sandwich_game_header.png",
        tags: ["React", "Tailwind", "MongoDB", "OpenAI API"],
        date: "2025",
        crunch: 1,
        cutoff: 0.63,
        isDetails: false,
        liveLink: "https://sandwich-alignment.vercel.app/about"
    },
    {
      id: 4,
      title: "Gridworld Streaming",
      description: "A responsive music streaming platform built for an independent artist, exploring new models of direct-to-artist financial support.",
      image: "/images/web/gridworld_streaming_header.png",
      tags: ["React", "MongoDB", "Firebase", "Stripe", "JWT"],
      date: "2024",
      crunch: 1,
      cutoff: 0.75,
      isDetails: false,
      liveLink: "https://www.gridworldstreaming.com/"
    },
    {
        id: 5,
        title: "For Edmonia: Together Sculpting",
        description: "A web app allowing users to explore sculptor Edmonia Lewis's archive while creating their own collage.",
        image: "/images/web/edmonia_header.png",
        tags: ["React"],
        date: "2023",
        crunch: 1,
        cutoff: 0.85,
        isDetails: false,
        liveLink: "https://foredmonia.com/collage"
      },
      {
        id: 6,
        title: "Virtual Free Little Library",
        description: "A file-sharing site to recreate the experience of a free little library, on the web.",
        image: "/images/web/free_little_library_header.png",
        tags: ["HTML", "CSS", "JavaScript"],
        date: "2023",
        crunch: 1,
        cutoff: 0.7,
        isDetails: false,
        liveLink: "https://freewaterhouse.com/library/lending_library.php"
      },
      {
        id: 7,
        title: "Collaborative Collage",
        description: "A collage creation tool utilizing web sockets for real-time multi-user collaboration.",
        image: "/images/web/collab_collage.png",
        tags: ["HTML", "CSS", "JavaScript"],
        date: "2023",
        crunch: 1,
        cutoff: 0.3,
        isDetails: false,
        liveLink: "https://freewaterhouse.com/collage/"
      }
    ];
      

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
            onViewDetails={() => console.log(`View details for ${project.title}`)}
          />
        ))}
      </div>
    </div>
  );
} 