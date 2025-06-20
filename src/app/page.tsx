export default function Home() {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img 
              src="/images/bio_pic_2.JPG"
              alt="Andrew Boylan"
              className="w-full h-96 lg:w-[490px] lg:h-[490px] object-cover rounded-lg shadow-lg"
            />
            <p className="text-sm text-gray-500 mt-2 text-center">Hiking Acatenango in Guatemala</p>
          </div>
          
          {/* Bio Text */}
          <div className="flex-1">
            <p className="lg:text-4xl text-3xl font-bold text-gray-900 mb-6">
              Andrew Boylan is a full-stack developer creating interactive experiences in the browser and beyond.
            </p>
            
            {/* Quick Links */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/web" 
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                View Web Projects
              </a>
              <a 
                href="/contact" 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
