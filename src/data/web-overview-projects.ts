import { browserInstrumentProjects } from "@/data/browser-instruments-projects";
import { webProjects } from "@/data/web-projects";
import { pickProjectsByTitle } from "@/lib/project-lists";

type WebOverviewProject =
  (
    | (typeof webProjects)[number]
    | (typeof browserInstrumentProjects)[number]
  ) & {
    liveLink?: string;
    slug?: string;
    status?: string;
    featuredLinks?: {
      label: string;
      href: string;
    }[];
  };

export const webOverviewProjects = pickProjectsByTitle<WebOverviewProject>(
  [...webProjects, ...browserInstrumentProjects],
  [
    "Paper Planet",
    "Sharkbite",
    "Cicada",
    "Knight Stained Glass",
    "Data Analytics for Critical Thinkers",
    "Desire Path Radio",
    "Doom Meeting",
    "Diorama Web Game",
    "Sandwich Alignment Game",
    "YouTube Sequencer",
    "Gridworld Streaming",
    "For Edmonia: Together Sculpting",
    "Virtual Free Little Library",
    "Collaborative Collage",
  ],
);
