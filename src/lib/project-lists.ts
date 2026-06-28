export function pickProjectsByTitle<T extends { title: string }>(
  projects: readonly T[],
  titles: readonly string[],
): T[] {
  const projectByTitle = new Map<string, T>();

  for (const project of projects) {
    if (projectByTitle.has(project.title)) {
      throw new Error(`Duplicate project title in ordered project list: ${project.title}`);
    }

    projectByTitle.set(project.title, project);
  }

  return titles.map((title) => {
    const project = projectByTitle.get(title);

    if (!project) {
      throw new Error(`Missing project in ordered project list: ${title}`);
    }

    return project;
  });
}
