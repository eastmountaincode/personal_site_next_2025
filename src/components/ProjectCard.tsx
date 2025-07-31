import { useAtomValue } from 'jotai';
import { crunchOverrideAtom } from '@/state/atoms';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  date: string;
  onViewDetails?: () => void;
  className?: string;
  cutoff?: number;
  crunch?: number;
  isDetails?: boolean;
  liveLink?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  date,
  onViewDetails,
  className = "",
  cutoff,
  crunch,
  isDetails,
  liveLink
}: ProjectCardProps) {
  const crunchOverride = useAtomValue(crunchOverrideAtom);
  const effectiveCrunch = crunchOverride ?? crunch;
  return (
    <div
      className={`${className}`}
      style={{
        clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
        background: 'black',
        padding: '1px'
      }}
    >
      <div className="p-6 bg-gray-100 flex flex-col h-full" style={{
        clipPath: 'polygon(19px 0, calc(100% - 19px) 0, 100% 19px, 100% calc(100% - 19px), calc(100% - 19px) 100%, 19px 100%, 0 calc(100% - 19px), 0 19px)'
      }}>
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
          {date}
        </span>
      </div>

      {/* Image - only show if provided */}
      {image && (
        <div className="mb-4 aspect-[2/1] overflow-hidden">
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

      {/* Description */}
      <p className="text-gray-600 mb-4">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="border border-1 border-black px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full select-none"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Row - pushed to bottom */}
      <div className="flex flex-col justify-between items-start mt-auto">
        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline text-sm font-medium"
          >
            Live Link ↗
          </a>
        )}
        {isDetails && onViewDetails && (
          <button
            onClick={onViewDetails}
            className="text-black hover:underline text-sm font-medium cursor-pointer"
          >
            More Details →
          </button>
        )}
      </div>
      </div>
    </div>
  );
} 