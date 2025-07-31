export const bioinformaticsProjects = [
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
        description: "Executed comprehensive single-cell RNA-seq analysis using Seurat and Harmony. Characterized novel epithelial and immune cell subtypes, assessed differential expression in response to COVID-19 infection and vaccination, and validated cell-type distributions using external datasets from CELLxGENE. Investigated chemokine-driven recruitment mechanisms, supporting research on immune cell infiltration into breast milk.",
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
        description: "Identified genes linked to the inception of bioluminescence via dN/dS analysis, time series analysis, and set theory. Reconstructed DNA MSAs from protein alignments and transcriptomes to supply the nucleotide context a published pipeline lacked. Automated a transcription assembly pipeline.",
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
        description: "Generated AlphaFold structures for a set of assay-associated protein mutations, performed structural analysis using KNN clustering and local RMSD visualization, discovered mutation-driven structural patterns correlated with assay scores, and identified variant combinations for further validation.",
        image: "/images/bioinformatics/protein2.webp",
        tags: ["Python", "AlphaFold", "KNN Clustering", "Pandas", "Matplotlib"],
        date: "2023",
        crunch: 1,
        cutoff: 0.65,
        isDetails: false
    }
];