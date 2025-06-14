"use client";

import { useState, useEffect, useRef } from "react";

export default function HalftoneTestNoRotationPage() {
  // Parameters for the halftone effect
  const [brightness, setBrightness] = useState(0.55);
  const [blur, setBlur] = useState(2.9);
  const [contrast, setContrast] = useState(100);
  const [dotSize, setDotSize] = useState(4.3);
  const [gridSize, setGridSize] = useState(10.4);
  const [containerWidth, setContainerWidth] = useState(400);
  const [imageBrightness, setImageBrightness] = useState(0.67);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth - 96; // Account for padding (p-6 md:p-8)
        const maxWidth = 400; // Maximum width/height for the square
        const constrainedWidth = Math.min(availableWidth, maxWidth);
        setContainerWidth(Math.floor(constrainedWidth / gridSize) * gridSize);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [gridSize]);

  return (
    <div className="p-6 md:p-8" ref={containerRef}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Halftone Test (No Rotation)</h1>

      </div>

      {/* Content */}
      <div 
        className="mb-8 relative overflow-hidden"
        style={{
          width: `${containerWidth}px`,
          height: `${Math.floor((containerWidth / 2) / gridSize) * gridSize}px`,
          filter: `brightness(${brightness}) blur(${blur}px) contrast(${contrast})`,
        }}
      >
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhQTMF600NM__R8LbbJL3HqabN-l6r6f-Z5dDtJ6qkq8BXresbsGbgteuKzgvA6pU9M4&usqp=CAU"
          alt="Protein structure"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: `grayscale(100%) brightness(${imageBrightness})`,
          }}
        />
        
        {/* Halftone overlay using pseudo-element approach */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${dotSize}px at center, black, white)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            mixBlendMode: 'screen'
          }}
        />
      </div>
        
      {/* Blur Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blur: {blur}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={blur}
          onChange={(e) => setBlur(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Contrast Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contrast: {contrast}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={contrast}
          onChange={(e) => setContrast(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Dot Size Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dot Size: {dotSize}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={dotSize}
          onChange={(e) => setDotSize(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Grid Size Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grid Size: {gridSize}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={gridSize}
          onChange={(e) => setGridSize(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Image Brightness Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Brightness: {imageBrightness}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={imageBrightness}
          onChange={(e) => setImageBrightness(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

    </div>
  );
}
