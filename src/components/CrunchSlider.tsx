"use client";

import { useAtom } from 'jotai';
import { crunchOverrideAtom } from '@/state/atoms';

export default function CrunchSlider() {
  const [crunchOverride, setCrunchOverride] = useAtom(crunchOverrideAtom);

  const handleIncrement = () => {
    const currentValue = crunchOverride || 1;
    if (currentValue < 3) {
      setCrunchOverride(currentValue + 1);
    }
  };

  const handleDecrement = () => {
    const currentValue = crunchOverride || 1;
    if (currentValue > 1) {
      setCrunchOverride(currentValue - 1);
    }
  };

  const currentValue = crunchOverride || 1;

  return (
    <div className="hidden md:block">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Crunch</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleDecrement}
            disabled={currentValue <= 1}
            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black disabled:text-gray-300"
          >
            −
          </button>
          <span className="w-4 text-center text-sm font-mono">{currentValue}</span>
          <button
            onClick={handleIncrement}
            disabled={currentValue >= 3}
            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black disabled:text-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
} 