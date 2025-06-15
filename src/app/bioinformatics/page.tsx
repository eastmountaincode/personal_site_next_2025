"use client";

import ProjectCard from "@/components/ProjectCard";

export default function BioinformaticsPage() {
  const projects = [
    {
      id: 1,
      title: "Protein Structure Prediction",
      description: "Machine learning approach to predict protein tertiary structure from amino acid sequences using transformer models.",
      image: "/images/protein2.webp",
      tags: ["Python", "PyTorch", "Protein Folding", "Deep Learning"],
      date: "2026",
      crunch: 1,
      cutoff: 0.65,
      isDetails: false
    },
    {
      id: 2,
      title: "Genomic Variant Analysis Pipeline",
      description: "Automated pipeline for processing and analyzing genomic variants from whole genome sequencing data.",
      image: "/dna-placeholder.svg",
      tags: ["Bioconductor", "R", "NGS", "GATK"],
      date: "2023",
      crunch: 1,
      cutoff: 0.8,
      isDetails: false
    },
    {
      id: 3,
      title: "Drug-Target Interaction Network",
      description: "Network analysis of drug-target interactions using graph neural networks to predict novel therapeutic targets.",
      image: "/dna-placeholder.svg",
      tags: ["NetworkX", "Graph ML", "Drug Discovery", "Python"],
      date: "2023",
      crunch: 1,
      cutoff: 0.8,
      isDetails: false
    },
    {
      id: 4,
      title: "scRNA-seq Cell Type Classification",
      description: "Single-cell RNA sequencing analysis for automated cell type identification in immune system studies.",
      image: "/dna-placeholder.svg",
      tags: ["Scanpy", "Python", "Single Cell", "Immunology"],
      date: "2024",
      crunch: 1,
      cutoff: 0.8,
      isDetails: false
    },

  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bioinformatics</h1>
        {/* <p className="text-lg text-gray-600 max-w-3xl">
          Computational approaches to biological problems, from genomics and proteomics 
          to systems biology and drug discovery. Here are some of the projects I've worked on 
          in the intersection of biology and computer science.
        </p> */}
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
            onViewDetails={() => console.log(`View details for ${project.title}`)}
          />
        ))}
      </div>

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