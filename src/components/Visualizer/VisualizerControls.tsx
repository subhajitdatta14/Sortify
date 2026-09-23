import React, { useState } from 'react';
import { MotionMode } from '../../types';

interface VisualizerControlsProps {
  isPlaying: boolean;
  canStepBack: boolean;
  canStepForward: boolean;
  isComplete: boolean;
  onStartPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onShuffle: () => void;
  motionMode: MotionMode;
  onToggleMotion: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  minValue: number;
  maxValue: number;
  onRangeChange: (min: number, max: number) => void;
  onApplyCustomArray: (numbers: number[]) => { success: boolean; error?: string };
}

export const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  isPlaying,
  canStepBack,
  canStepForward,
  isComplete,
  onStartPause,
  onStepBack,
  onStepForward,
  onReset,
  onShuffle,
  motionMode,
  onToggleMotion,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
  minValue,
  maxValue,
  onRangeChange,
  onApplyCustomArray,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [customError, setCustomError] = useState<string | null>(null);
  const [localMin, setLocalMin] = useState(String(minValue));
  const [localMax, setLocalMax] = useState(String(maxValue));

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError(null);
    const parts = customInput
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length < 2) {
      setCustomError('Please enter at least 2 numbers separated by commas.');
      return;
    }

    const nums: number[] = [];
    for (const part of parts) {
      const n = Number(part);
      if (isNaN(n)) {
        setCustomError(`"${part}" is not a valid number.`);
        return;
      }
      nums.push(Math.round(n));
    }

    const res = onApplyCustomArray(nums);
    if (!res.success && res.error) {
      setCustomError(res.error);
    } else {
      setCustomError(null);
    }
  };

  const handleMinBlur = () => {
    const minVal = parseInt(localMin, 10);
    const maxVal = parseInt(localMax, 10);
    if (!isNaN(minVal) && !isNaN(maxVal) && minVal <= maxVal) {
      onRangeChange(minVal, maxVal);
    } else {
      setLocalMin(String(minValue));
    }
  };

  const handleMaxBlur = () => {
    const minVal = parseInt(localMin, 10);
    const maxVal = parseInt(localMax, 10);
    if (!isNaN(minVal) && !isNaN(maxVal) && minVal <= maxVal) {
      onRangeChange(minVal, maxVal);
    } else {
      setLocalMax(String(maxValue));
    }
  };

  return (
    <div className="w-full space-y-4 pt-2">
      {/* Legend Row */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs text-[#94A3B8] flex-wrap justify-start px-2 sm:px-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] inline-block shadow-[0_0_6px_rgba(245,158,11,0.5)]" />
          <span>Comparing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] inline-block shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
          <span>Pivot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] inline-block shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          <span>Locked in place</span>
        </div>
      </div>

      {/* Main Action Buttons & Speed Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 sm:px-4">
        {/* Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Start / Pause Button */}
          <button
            onClick={onStartPause}
            className="px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_12px_rgba(139,92,246,0.35)] active:scale-95 cursor-pointer"
          >
            {isPlaying ? 'Pause' : isComplete ? 'Restart' : 'Start'}
          </button>

          {/* Back */}
          <button
            onClick={onStepBack}
            disabled={!canStepBack || isPlaying}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors bg-[#141930] border border-[#232D52] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#8B5CF6]/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Back
          </button>

          {/* Next Step */}
          <button
            onClick={onStepForward}
            disabled={!canStepForward || isPlaying}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors bg-[#141930] border border-[#232D52] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#8B5CF6]/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next step
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors bg-[#141930] border border-[#232D52] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#8B5CF6]/50 cursor-pointer"
          >
            Reset
          </button>

          {/* Shuffle */}
          <button
            onClick={onShuffle}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors bg-[#141930] border border-[#232D52] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#8B5CF6]/50 cursor-pointer"
          >
            Shuffle
          </button>

          {/* Motion Toggle */}
          <button
            onClick={onToggleMotion}
            className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors bg-[#141930] border border-[#232D52] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#8B5CF6]/50 cursor-pointer capitalize"
            title="Switch animation motion intensity"
          >
            Motion: {motionMode}
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5 bg-[#0D1224] sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-xl sm:rounded-none border border-[#1E2640] sm:border-0 self-stretch sm:self-auto">
          <label htmlFor="speed-slider" className="text-xs text-[#94A3B8] font-medium whitespace-nowrap">
            Speed
          </label>
          <input
            id="speed-slider"
            type="range"
            min="30"
            max="800"
            step="10"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="flex-1 sm:w-28 accent-[#8B5CF6] cursor-pointer bg-[#181E36] rounded-lg h-1.5"
          />
          <span className="text-xs font-mono text-[#F8FAFC] font-medium min-w-[46px] text-right">
            {speed}ms
          </span>
        </div>
      </div>

      {/* Sub controls: Array Size, Custom Numbers, Range */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 px-2 sm:px-4 pt-1 border-t border-[#181E36]">
        {/* Array Size Slider */}
        <div className="md:col-span-4 flex flex-col justify-center gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#94A3B8] font-medium">Array size:</span>
            <span className="text-[#8B5CF6] font-bold font-mono">{arraySize}</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={isPlaying}
            className="w-full accent-[#8B5CF6] cursor-pointer bg-[#181E36] rounded-lg h-1.5"
          />
        </div>

        {/* Custom Numbers Input */}
        <div className="md:col-span-8 flex flex-col gap-1">
          <div className="text-xs text-[#94A3B8] font-medium">Your own numbers</div>
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                if (customError) setCustomError(null);
              }}
              disabled={isPlaying}
              placeholder="e.g. 5, 2, 9, 1, 7"
              className="flex-1 bg-[#080B16] border border-[#1E2640] focus:border-[#8B5CF6] text-xs sm:text-sm text-[#F8FAFC] px-3 py-1.5 rounded-full placeholder-slate-600 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isPlaying}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-transparent border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/15 cursor-pointer transition-colors disabled:opacity-40"
            >
              Use
            </button>
          </form>
          {customError && (
            <span className="text-[11px] text-[#EF4444] mt-0.5">{customError}</span>
          )}
        </div>
      </div>

      {/* Range controls & Helper Note */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-4 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span>Lowest value</span>
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              onBlur={handleMinBlur}
              disabled={isPlaying}
              className="w-16 bg-[#080B16] border border-[#1E2640] text-center text-[#F8FAFC] rounded-md py-1 text-xs focus:border-[#8B5CF6] focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span>Highest value</span>
            <input
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              onBlur={handleMaxBlur}
              disabled={isPlaying}
              className="w-16 bg-[#080B16] border border-[#1E2640] text-center text-[#F8FAFC] rounded-md py-1 text-xs focus:border-[#8B5CF6] focus:outline-none"
            />
          </div>
        </div>

        <div className="text-[11px] text-[#94A3B8] italic">
          Duplicate values are allowed and handled correctly.
        </div>
      </div>
    </div>
  );
};
