import { bioinformaticsProjects } from "@/data/bioinformatics-projects";
import { bioinformaticsSoftware } from "@/data/bioinformatics-software";
import { pickProjectsByTitle } from "@/lib/project-lists";

type BioinformaticsOverviewProject =
  (
    | (typeof bioinformaticsProjects)[number]
    | (typeof bioinformaticsSoftware)[number]
  ) & {
    liveLink?: string;
    status?: string;
  };

export const bioinformaticsOverviewProjects = pickProjectsByTitle<BioinformaticsOverviewProject>(
  [...bioinformaticsSoftware, ...bioinformaticsProjects],
  [
    "Novo",
    "Evaluating the Efficacy of a Liquid Biopsy Enhancement Drug",
    "scRNA-seq Characterization of A Novel Epithelial Cell Type in Breast Milk",
    "Investigating Genes Related to Endogenous Biosynthesis of Luciferin in Cypridinid Ostracods",
    "Discovering Structure–Function Links in PCSK9 Variants",
  ],
);
