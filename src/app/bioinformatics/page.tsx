"use client";

import ProjectCard from "@/components/ProjectCard";

export default function BioinformaticsPage() {
    const projects = [
        {
            id: 1,
            title: "Evaluating the Efficacy of a Liquid Biopsy Enhancement Drug",
            description: "Engineered a custom cfDNA analysis pipeline for somatic variant calling, navigating challenges such as low coverage. Analyzed tumor-bearing mouse samples to evaluate drug-induced increases in ctDNA abundance, providing support for evaluating the efficacy of a candidate liquid-biopsy enhancement drug.",
            image: "/images/bioinformatics/cfDNA.png",
            tags: ["GATK", "cfDNA", "Python", "Variant Calling", "Snakemake", "ichorCNA", "Pandas", "Plotly"],
            date: "2025",
            crunch: 1,
            cutoff: 0.7,
            isDetails: false
        },

        {
            id: 2,
            title: "scRNA-seq Characterization of A Novel Epithelial Cell Type in Breast Milk",
            description: [
                "Executed comprehensive single-cell RNA-seq analysis using Seurat and Harmony.",
                "Characterized novel epithelial and immune cell subtypes, assessed differential expression in response to COVID-19 infection and vaccination,",
                "and validated cell-type distributions using external datasets from CELLxGENE. Investigated chemokine-driven recruitment mechanisms,",
                "supporting research on immune cell infiltration into breast milk."
            ].join(" "),
            image: "/images/bioinformatics/scRNAseq.png",
            tags: ["R", "Seurat", "Harmony", "CELLxGENE", "scRNA-seq", "Docker"],
            date: "2024",
            crunch: 1,
            cutoff: 0.6,
            isDetails: false
        },
        {
            id: 3,
            title: "Investigating Genes Related to Endogenous Biosynthesis of Luciferin in Cypridinid Ostracods",
            description: "Identified genes linked to the inception of bioluminescence via dN/dS analysis, time series analysis, and set theory. " +
                "Reconstructed DNA MSAs from protein alignments and transcriptomes to supply the nucleotide context " +
                "a published pipeline lacked. Automated a transcription assembly pipeline.",
            image: "/images/bioinformatics/bioluminescence.png",
            tags: ["Python", "R", "Biopython", "PAML", "OrthoFinder", "BLAST", "ete3", "Pandas"],
            date: "2023",
            crunch: 1,
            cutoff: 0.1,
            isDetails: false
        },
        {
            id: 4,
            title: "Discovering Structure–Function Links in PCSK9 Variants",
            description: "Generated AlphaFold structures for a set of assay-associated protein mutations, " +
                "performed structural analysis using KNN clustering and local RMSD visualization, " +
                "discovered mutation-driven structural patterns correlated with assay scores, and " +
                "identified variant combinations for further validation.",
            image: "/images/bioinformatics/protein2.webp",
            tags: ["Python", "AlphaFold", "KNN Clustering", "Pandas", "Matplotlib"],
            date: "2023",
            crunch: 1,
            cutoff: 0.65,
            isDetails: false
        },

    ];

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-8 md:hidden">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Bioinformatics</h1>
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