import { FaInstagram, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Home() {
  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img 
              src="/images/andrew-pic-1.jpg"
              alt="Andrew Boylan"
              className="w-full max-w-sm mx-auto md:max-w-xs lg:max-w-sm h-auto max-h-96 md:max-h-none object-cover"
            />
          </div>
          
          {/* Bio Text */}
          <div className="flex-1">
            <p className="lg:text-4xl text-3xl text-gray-900 mb-6">
              Creating interactive experiences in the browser and beyond.
            </p>
            
            {/* Info Details */}
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Based in:</div>
                <div className="text-gray-900">Boston (Brooklyn soon)</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Most Recent Project:</div>
                <div className="text-gray-900">An <a href="https://desirepathradio.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">internet radio station</a> for outdoor education and music.</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Currently playing:</div>
                <div className="text-gray-900">Gorogoa</div>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">My books are:</div>
                <div className="text-gray-900">Open - let&apos;s work!</div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6 ml-5">
              <a 
                href="https://www.instagram.com/ndrewboylan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              
              <a 
                href="mailto:andreweboylan@gmail.com"
                className="text-gray-600 hover:text-gray-900"
              >
                <MdEmail className="w-6 h-6" />
              </a>
              
              <a 
                href="https://github.com/eastmountaincode" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
