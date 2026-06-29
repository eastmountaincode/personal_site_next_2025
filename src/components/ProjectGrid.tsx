import { Children, type CSSProperties, type ReactNode } from "react";

export const PROJECT_GRID_DEFAULT_MIN_CARD_WIDTH = "320px";
export const PROJECT_GRID_LONG_DESCRIPTION_MIN_CARD_WIDTH = "400px";
export const PROJECT_GRID_LONG_DESCRIPTION_MAX_WIDTH = "1000px";
export const PROJECT_GRID_LONG_DESCRIPTION_LENGTH = 260;

export function getProjectGridColumns(
  minCardWidth = PROJECT_GRID_DEFAULT_MIN_CARD_WIDTH,
): string {
  return `repeat(auto-fit, minmax(min(100%, ${minCardWidth}), 1fr))`;
}

export const PROJECT_GRID_COLUMNS = getProjectGridColumns();

export const PROJECT_GRID_SINGLE_CARD_MAX_WIDTH = "480px";

export function getProjectGridMinCardWidth<T extends { description: string }>(
  projects: readonly T[],
): string {
  return hasLongProjectDescription(projects)
    ? PROJECT_GRID_LONG_DESCRIPTION_MIN_CARD_WIDTH
    : PROJECT_GRID_DEFAULT_MIN_CARD_WIDTH;
}

export function getProjectGridMaxWidth<T extends { description: string }>(
  projects: readonly T[],
): string | undefined {
  return hasLongProjectDescription(projects)
    ? PROJECT_GRID_LONG_DESCRIPTION_MAX_WIDTH
    : undefined;
}

function hasLongProjectDescription<T extends { description: string }>(
  projects: readonly T[],
): boolean {
  return projects.some(
    (project) => project.description.length >= PROJECT_GRID_LONG_DESCRIPTION_LENGTH,
  );
}

type ProjectGridProps = {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  minCardWidth?: string;
  style?: CSSProperties;
};

export default function ProjectGrid({
  children,
  className = "",
  maxWidth,
  minCardWidth,
  style,
}: ProjectGridProps) {
  const isSingleCard = Children.count(children) === 1;
  const singleCardClassName = isSingleCard ? "md:max-w-[480px]" : "";
  const gridStyle: CSSProperties = {
    gridTemplateColumns: getProjectGridColumns(minCardWidth),
    maxWidth,
  };

  return (
    <div
      className={`grid w-full gap-6 ${singleCardClassName} ${className}`}
      style={{ ...gridStyle, ...style }}
    >
      {children}
    </div>
  );
}
