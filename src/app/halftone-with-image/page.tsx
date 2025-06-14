"use client";

import { useState, useEffect, useRef } from "react";

export default function HalftoneWithImagePage() {
  // Parameters for the halftone effect
  const [brightness, setBrightness] = useState(2.96);
  const [blur, setBlur] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [dotSize, setDotSize] = useState(1.6);
  const [gridSize, setGridSize] = useState(2.7);
  const [rotation, setRotation] = useState(1); // 0 = no rotation, 1 = traditional CMYK angles
  const [containerWidth, setContainerWidth] = useState(400);
  
  // Parameters for the black and white version
  const [bwBrightness, setBwBrightness] = useState(0.8);
  const [bwBlur, setBwBlur] = useState(3);
  const [bwContrast, setBwContrast] = useState(200);
  const [bwDotSize, setBwDotSize] = useState(10);
  const [bwGridSize, setBwGridSize] = useState(20);
  const [bwContainerWidth, setBwContainerWidth] = useState(600);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth - 96; // Account for padding (p-6 md:p-8)
        const maxWidth = 600; // Maximum width/height for the square
        const constrainedWidth = Math.min(availableWidth, maxWidth);
        
        // Calculate width for color version
        setContainerWidth(Math.floor(constrainedWidth / gridSize) * gridSize);
        
        // Calculate width for black and white version
        setBwContainerWidth(Math.floor(constrainedWidth / bwGridSize) * bwGridSize);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [gridSize, bwGridSize]);

  return (
    <div className="p-6 md:p-8" ref={containerRef}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Halftone With Image</h1>

      </div>
      <div><h2 className="text-3xl font-bold text-gray-900 mb-4">Color</h2></div>

      {/* Content */}
      <div 
        className="mb-8 relative overflow-hidden"
        style={{
          width: `${containerWidth}px`,
          height: `${containerWidth}px`,
          filter: `brightness(${brightness}) blur(${blur}px) contrast(${contrast})`,
        }}
      >
        {/* Base image */}
        <img 
          src="https://i0.wp.com/hub.jacksonkayak.com/wp-content/uploads/2020/02/China-4-e1582206244552.jpeg?fit=1000%2C750&ssl=1"
          alt="Chinese waterfall in color"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        {/* Halftone overlay */}
        <div className="absolute inset-0">
          {/* Black (K) layer - 45° */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${dotSize}px at center, black, white)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
              transform: `rotate(${45 * rotation}deg) scale(1.42)`,
              transformOrigin: 'center',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Cyan (C) layer - 15° */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${dotSize}px at center, cyan, white)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
              transform: `rotate(${15 * rotation}deg) scale(1.42)`,
              transformOrigin: 'center',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Magenta (M) layer - 75° */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${dotSize}px at center, magenta, white)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
              transform: `rotate(${75 * rotation}deg) scale(1.42)`,
              transformOrigin: 'center',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Yellow (Y) layer - 0° */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${dotSize}px at center, yellow, white)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
              transform: `rotate(${0 * rotation}deg) scale(1.42)`,
              transformOrigin: 'center',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Screen blend mode overlay */}
          <div 
            className="absolute inset-0"
            style={{
              mixBlendMode: 'screen'
            }}
          />
        </div>
      </div>
        
      {/* Brightness Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brightness: {brightness}
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.01"
          value={brightness}
          onChange={(e) => setBrightness(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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

      {/* Rotation Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rotation: {rotation === 0 ? 'Grid Aligned' : 'CMYK Angles'}, Rotation: {rotation}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={rotation}
          onChange={(e) => setRotation(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div><h2 className="text-3xl font-bold text-gray-900 mb-4">Black & White</h2></div>

      <div 
        className="mb-8 relative overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(${bwDotSize}px at center, black, white)`,
          backgroundSize: `${bwGridSize}px ${bwGridSize}px`,
          width: `${bwContainerWidth}px`,
          height: `${bwContainerWidth}px`,
          filter: `brightness(${bwBrightness}) blur(${bwBlur}px) contrast(${bwContrast})`,
        }}
      >
        <img 
          src="https://i0.wp.com/hub.jacksonkayak.com/wp-content/uploads/2020/02/China-4-e1582206244552.jpeg?fit=1000%2C750&ssl=1"
          alt="Chinese waterfall black and white"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            mixBlendMode: 'screen',
            filter: 'grayscale(100%)',
          }}
        />
      </div>

      {/* Brightness Slider for Black & White */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brightness: {bwBrightness}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={bwBrightness}
          onChange={(e) => setBwBrightness(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Blur Slider for Black & White */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blur: {bwBlur}px
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={bwBlur}
          onChange={(e) => setBwBlur(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Contrast Slider for Black & White */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contrast: {bwContrast} (keep low for round dots)
        </label>
        <input
          type="range"
          min="100"
          max="500"
          step="1"
          value={bwContrast}
          onChange={(e) => setBwContrast(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Dot Size Slider for Black & White */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dot Size: {bwDotSize}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={bwDotSize}
          onChange={(e) => setBwDotSize(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Grid Size Slider for Black & White */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grid Size: {bwGridSize}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="0.1"
          value={bwGridSize}
          onChange={(e) => setBwGridSize(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

    </div>
  );
}
