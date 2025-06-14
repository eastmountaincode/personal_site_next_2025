"use client";

import { useState, useEffect, useRef } from "react";

export default function HalftoneWithGradientPage() {
  // Parameters for the halftone effect
  const [blur, setBlur] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [dotSize, setDotSize] = useState(4.9);
  const [gridSize, setGridSize] = useState(6.1);
  const [linearAngle, setLinearAngle] = useState(45);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [containerWidth, setContainerWidth] = useState(400);
  const [opacity, setOpacity] = useState(0.8);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setLinearAngle(prev => (prev + 1) % 360);
    }, 20); // Rotate 1 degree every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth - 96; // Account for padding (p-6 md:p-8)
        setContainerWidth(Math.floor(availableWidth / gridSize) * gridSize);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Halftone Test With Linear Gradient</h1>

      </div>

      {/* Content */}
      <div className="mb-8" style={{
        backgroundImage: `linear-gradient(${linearAngle}deg, transparent, rgba(0,0,0,${opacity})), radial-gradient(${dotSize}px at center, black, white)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: `100% 100%, ${gridSize}px ${gridSize}px`,
        width: `${containerWidth}px`,
        height: `${Math.floor(200 / gridSize) * gridSize}px`,
        filter: `blur(${blur}px) contrast(${contrast})`,
      }}></div>
        
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

      {/* Linear Gradient Angle Slider */}
      <div className="mb-6 max-w-md">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Linear Gradient Angle: {linearAngle}°
          </label>
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              isAutoRotating 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isAutoRotating ? 'Stop' : 'Auto Rotate'}
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          step="1"
          value={linearAngle}
          onChange={(e) => setLinearAngle(parseInt(e.target.value))}
          disabled={isAutoRotating}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${
            isAutoRotating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        />
      </div>

      {/* Opacity Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Opacity: {opacity}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

    </div>
  );
}
