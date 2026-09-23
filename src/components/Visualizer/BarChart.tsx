import React from 'react';
import { MotionMode } from '../../types';

interface BarChartProps {
  array: number[];
  comparing: number[];
  swapping: number[];
  pivot: number | null;
  sorted: number[];
  motionMode: MotionMode;
}

export const BarChart: React.FC<BarChartProps> = ({
  array,
  comparing,
  swapping,
  pivot,
  sorted,
  motionMode,
}) => {
  const minVal = Math.min(...array);
  const maxVal = Math.max(...array);
  const range = maxVal === minVal ? 1 : maxVal - minVal;

  // Transition style based on motion mode
  const transitionClass =
    motionMode === 'instant'
      ? ''
      : motionMode === 'subtle'
      ? 'transition-all duration-150 ease-out'
      : 'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]';

  return (
    <div className="w-full h-56 sm:h-72 md:h-80 flex items-end justify-center gap-0.5 sm:gap-1.5 md:gap-2 px-1 sm:px-4 md:px-6 pt-6 pb-2 select-none relative overflow-hidden">
      {/* Background grid line at bottom */}
      <div className="absolute bottom-2 left-2 right-2 sm:left-4 sm:right-4 h-px bg-[#181E36]" />

      {array.map((value, idx) => {
        // Compute height percentage (between 15% and 94%)
        const normalized = (value - minVal) / range;
        const heightPercent = 15 + normalized * 79;

        // Determine state and color matching exact palette
        let barColor = 'bg-[#313E73] border border-[#425396] text-[#F8FAFC]';
        let isSpecial = false;

        if (swapping.includes(idx)) {
          barColor = 'bg-[#EF4444] border border-[#FCA5A5] text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]';
          isSpecial = true;
        } else if (comparing.includes(idx)) {
          barColor = 'bg-[#F59E0B] border border-[#FCD34D] text-[#080B16] shadow-[0_0_12px_rgba(245,158,11,0.5)] font-bold';
          isSpecial = true;
        } else if (pivot === idx) {
          barColor = 'bg-[#8B5CF6] border border-[#C4B5FD] text-white shadow-[0_0_12px_rgba(139,92,246,0.5)] font-bold';
          isSpecial = true;
        } else if (sorted.includes(idx)) {
          barColor = 'bg-[#22C55E] border border-[#86EFAC] text-[#080B16] shadow-[0_0_10px_rgba(34,197,94,0.35)]';
          isSpecial = true;
        }

        // Adjust text size based on array length and screen size
        const showValue = array.length <= 22;
        const textSize =
          array.length <= 10
            ? 'text-[10px] sm:text-xs md:text-sm'
            : array.length <= 16
            ? 'text-[8px] sm:text-[10px] md:text-xs'
            : 'text-[7px] sm:text-[9px] md:text-[10px]';

        return (
          <div
            key={idx}
            className="flex-1 max-w-16 h-full flex flex-col justify-end items-center relative group min-w-[3px] sm:min-w-[6px]"
          >
            {/* Value Label above Bar */}
            <div
              className={`font-mono font-semibold transition-all ${textSize} mb-1 ${
                isSpecial ? 'text-white scale-105' : 'text-[#F8FAFC]'
              } ${!showValue ? 'hidden sm:block' : ''}`}
              style={{
                marginBottom: '4px',
              }}
            >
              {value}
            </div>

            {/* Vertical Bar */}
            <div
              className={`w-full rounded-t-sm sm:rounded-t-md ${barColor} ${transitionClass}`}
              style={{
                height: `${heightPercent}%`,
              }}
              title={`Index ${idx}: ${value}`}
            />
          </div>
        );
      })}
    </div>
  );
};
