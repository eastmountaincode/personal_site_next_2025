'use client';

import { useAtomValue } from 'jotai';
import { crunchOverrideAtom } from '@/state/atoms';

interface ProjectLayoutProps {
  // Project metadata
  title: string;
  image?: string;
  tags: string[];
  date: string;
  liveLink?: string;
  crunch?: number;
  cutoff?: number;
  
  // Layout configuration
  backUrl: string;
  backText: string;
  
  // Content
  children: React.ReactNode;
}

export default function ProjectLayout({
  title,
  image,
  tags,
  date,
  liveLink,
  crunch,
  cutoff,
  backUrl,
  backText,
  children
}: ProjectLayoutProps) {
  const crunchOverride = useAtomValue(crunchOverrideAtom);
  const effectiveCrunch = crunchOverride ?? crunch;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Back button */}
      <div className="mb-8">
        <a
          href={backUrl}
          className="text-black hover:underline text-sm font-medium"
        >
          ← {backText}
        </a>
      </div>

      {/* Project Header */}
      <div className="mb-8">
        {/* Title and Date */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
            {date}
          </span>
        </div>

        {/* Project Image */}
        {image && (
          <div className="mb-6 aspect-[2/1] rounded-md overflow-hidden">
            {/* @ts-expect-error - Custom web component */}
            <as-dithered-image 
              src={image}
              alt={title}
              crunch={effectiveCrunch}
              cutoff={cutoff}
              darkrgba="rgba(0, 0, 0, 255)"
              lightrgba="rgba(240, 240, 240, 0)"
            />
          </div>
        )}

        {/* Tags and Live Link */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Live Link */}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:underline text-sm font-medium flex-shrink-0"
            >
              Live Link ↗
            </a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div>
        {children}
      </div>
    </div>
  );
}