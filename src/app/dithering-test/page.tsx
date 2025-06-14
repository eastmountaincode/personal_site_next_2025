"use client";

import { useState, useEffect, useRef } from "react";

export default function DitheringTestPage() {
  // Parameters for the dithering effect
  const [crunch, setCrunch] = useState(1);
  const [cutoff, setCutoff] = useState(0.5);
  const [imageBrightness, setImageBrightness] = useState(1);
  const [containerWidth, setContainerWidth] = useState(400);
  const [darkColor, setDarkColor] = useState("rgba(0, 0, 0, 255)");
  const [lightColor, setLightColor] = useState("rgba(255, 255, 255, 255)");
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth - 96; // Account for padding (p-6 md:p-8)
        const maxWidth = 400; // Maximum width/height for the square
        const constrainedWidth = Math.min(availableWidth, maxWidth);
        setContainerWidth(constrainedWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Load the as-dithered-image web component
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/as-dithered-image.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="p-6 md:p-8" ref={containerRef}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Atkinson Dithering Test</h1>
        <p className="text-gray-600">Using the as-dithered-image web component for pixel-perfect Atkinson dithering</p>
      </div>

      {/* Content */}
      <div 
        className="mb-8 relative overflow-hidden"
        style={{
          width: `${containerWidth}px`,
          height: `${Math.floor(containerWidth / 2)}px`, // 2:1 aspect ratio
          filter: `brightness(${imageBrightness})`,
        }}
      >
        {/* @ts-ignore - Custom web component */}
        <as-dithered-image 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvhQTMF600NM__R8LbbJL3HqabN-l6r6f-Z5dDtJ6qkq8BXresbsGbgteuKzgvA6pU9M4&usqp=CAU"
          alt="Test image for dithering"
          crunch={crunch}
          cutoff={cutoff}
          darkrgba={darkColor}
          lightrgba={lightColor}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
        
      {/* Crunch Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Crunch (Pixel Size): {crunch}
        </label>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={crunch}
          onChange={(e) => setCrunch(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Cutoff Slider */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cutoff (Brightness Threshold): {cutoff}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={cutoff}
          onChange={(e) => setCutoff(parseFloat(e.target.value))}
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

      {/* Color Presets */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Presets
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setDarkColor("rgba(0, 0, 0, 255)");
              setLightColor("rgba(255, 255, 255, 255)");
            }}
            className="px-3 py-1 bg-black text-white rounded text-sm"
          >
            Classic B&W
          </button>
          <button
            onClick={() => {
              setDarkColor("rgba(0, 0, 0, 255)");
              setLightColor("rgba(240, 240, 240, 0)");
            }}
            className="px-3 py-1 bg-gray-800 text-white rounded text-sm"
          >
            Transparent BG
          </button>
          <button
            onClick={() => {
              setDarkColor("rgba(139, 69, 19, 255)");
              setLightColor("rgba(245, 222, 179, 255)");
            }}
            className="px-3 py-1 text-white rounded text-sm"
            style={{ backgroundColor: '#8B4513' }}
          >
            Sepia
          </button>
          <button
            onClick={() => {
              setDarkColor("rgba(0, 100, 0, 255)");
              setLightColor("rgba(144, 238, 144, 255)");
            }}
            className="px-3 py-1 bg-green-800 text-white rounded text-sm"
          >
            Green Screen
          </button>
          <button
            onClick={() => {
              setDarkColor("rgba(25, 25, 112, 255)");
              setLightColor("rgba(173, 216, 230, 255)");
            }}
            className="px-3 py-1 bg-blue-800 text-white rounded text-sm"
          >
            Blue Tone
          </button>
        </div>
      </div>

      {/* Current Colors Display */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Colors
        </label>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Dark:</span>
            <div 
              className="w-8 h-8 border border-gray-300 rounded"
              style={{ backgroundColor: darkColor.replace(/rgba?\(([^)]+)\)/, 'rgb($1)') }}
            ></div>
            <span className="text-xs font-mono">{darkColor}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Light:</span>
            <div 
              className="w-8 h-8 border border-gray-300 rounded"
              style={{ backgroundColor: lightColor.replace(/rgba?\(([^)]+)\)/, 'rgb($1)') }}
            ></div>
            <span className="text-xs font-mono">{lightColor}</span>
          </div>
        </div>
      </div>

    </div>
  );
} 