import { useAtomValue } from 'jotai';
import { crunchOverrideAtom } from '@/state/atoms';
import ArrowGlyph from '@/components/ArrowGlyph';

interface ProjectCardProps {
  title: string;
  description: string;
  featuredLinks?: {
    label: string;
    href: string;
  }[];
  image?: string;
  tags: string[];
  date: string;
  onViewDetails?: () => void;
  className?: string;
  cutoff?: number;
  crunch?: number;
  isDetails?: boolean;
  liveLink?: string;
  status?: string;
}

export default function ProjectCard({
  title,
  description,
  featuredLinks,
  image,
  tags,
  date,
  onViewDetails,
  className = "",
  cutoff,
  crunch,
  isDetails,
  liveLink,
  status
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
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-gray-900">
            {title}
          </h3>
          {status && (
            <span className="mt-2 inline-block origin-left -rotate-2 border border-black bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-gray-900 select-none">
              {status}
            </span>
          )}
        </div>
        <span className="text-sm text-gray-600 flex-shrink-0">
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
        {featuredLinks && featuredLinks.length > 0 && (
          <>
            {" Featured in "}
            {featuredLinks.map((link, index) => (
              <span key={link.href}>
                {index > 0 && (index === featuredLinks.length - 1 ? " and " : ", ")}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {link.label}
                </a>
              </span>
            ))}
            .
          </>
        )}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="border border-1 border-black px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full select-none"
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
            className="group text-black text-sm font-medium"
          >
            <span className="group-hover:underline">Live Link</span>
            <ArrowGlyph intent="external" className="ml-1" />
          </a>
        )}
        {isDetails && onViewDetails && (
          <button
            onClick={onViewDetails}
            className="group text-black text-sm font-medium cursor-pointer"
          >
            <span className="group-hover:underline">More Details</span>
            <ArrowGlyph intent="details" className="ml-1" />
          </button>
        )}
      </div>
      </div>
    </div>
  );
} 
