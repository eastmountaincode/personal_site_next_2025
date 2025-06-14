"use client";

import { useState, useEffect, useRef } from "react";

export default function HalftoneTestNoRotationPage() {
  // Parameters for the halftone effect
  const [brightness, setBrightness] = useState(0.55);
  const [blur, setBlur] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [dotSize, setDotSize] = useState(6.6);
  const [gridSize, setGridSize] = useState(10);
  const [containerWidth, setContainerWidth] = useState(400);
  
  const containerRef = useRef<HTMLDivElement>(null);

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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Halftone Test (No Rotation)</h1>

      </div>

      {/* Content */}
      <div className="mb-8" style={{
        backgroundImage: `radial-gradient(${dotSize}px at center, black, white)`,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        width: `${containerWidth}px`,
        height: `${Math.floor(200 / gridSize) * gridSize}px`,
        filter: `blur(${blur}px) contrast(${contrast})`
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


    </div>
  );
}
