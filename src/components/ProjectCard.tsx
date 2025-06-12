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
  // Use placeholder image if none provided
  const imageUrl = image || "https://via.placeholder.com/400x240/e2e8f0/64748b?text=Project+Image";

  return (
    <div
      className={`bg-white rounded-lg shadow-md transition-shadow duration-300 p-6 border border-gray-200 flex flex-col ${className}`}
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

      {/* Image */}
      <div className="mb-4 aspect-[4/3] bg-gray-200 rounded-md overflow-hidden hidden sm:block">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "https://via.placeholder.com/400x240/e2e8f0/64748b?text=Image+Not+Found";
          }}
        />
      </div>

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