import { installationProjects } from "@/data/installation-projects";
import { pickProjectsByTitle } from "@/lib/project-lists";

export const installationOverviewProjects = pickProjectsByTitle(
  installationProjects,
  [
    "HTML Pollinator Garden",
    "Denial Payphone",
    "Poem Car",
  ],
);
