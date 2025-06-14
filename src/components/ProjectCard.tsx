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
  isDetails = true
}: ProjectCardProps) {
  return (
    <div
      className={`rounded-lg transition-shadow duration-300 p-6 border border-2 border-gray-200 flex flex-col ${className}`}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        <span className="text-sm text-gray-500 ml-2 flex-shrink-0">
          {date}
        </span>
      </div>

      {/* Image - only show if provided */}
      {image && (
        <div className="mb-4 aspect-[2/1] rounded-md overflow-hidden">
          {/* @ts-ignore - Custom web component */}
          <as-dithered-image 
            src={image}
            alt={title}
            crunch={crunch}
            cutoff={cutoff}
            darkrgba="rgba(0, 0, 0, 255)"
            lightrgba="rgba(240, 240, 240, 0)"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Row - pushed to bottom */}
      <div className="flex justify-end items-center mt-auto">
        {isDetails && onViewDetails && (
          <button
            onClick={onViewDetails}
            className="text-black hover:underline text-sm font-medium cursor-pointer"
          >
            View Details →
          </button>
        )}
      </div>
    </div>
  );
} 