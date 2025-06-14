interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  date: string;
  onViewDetails?: () => void;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  date,
  onViewDetails,
  className = ""
}: ProjectCardProps) {
  return (
    <div
      className={`bg-white rounded-lg transition-shadow duration-300 p-6 border border-gray-200 flex flex-col ${className}`}
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
          <div 
            className="halftone w-full h-full relative"
            style={{
              filter: 'grayscale(100%) brightness(0.55) blur(2px) contrast(99)'
            }}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(2.3px at center, black, white)',
                backgroundSize: '7.5px 7.5px',
                mixBlendMode: 'screen'
              }}
            />
          </div>
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
        {onViewDetails && (
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