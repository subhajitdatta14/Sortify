import React from 'react';
import { AlgorithmDefinition } from '../../types';

interface AlgorithmHeaderProps {
  algorithm: AlgorithmDefinition;
}

export const AlgorithmHeader: React.FC<AlgorithmHeaderProps> = ({ algorithm }) => {
  // Split name so the last word (e.g. "Sort") is styled in Electric Violet as in reference
  const nameParts = algorithm.name.split(' ');
  const prefix = nameParts.slice(0, -1).join(' ');
  const suffix = nameParts[nameParts.length - 1];

  return (
    <div className="text-center pt-2 pb-2 px-2">
      <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#F8FAFC] mb-1 font-display">
        {prefix ? <span>{prefix} </span> : null}
        <span className="text-[#8B5CF6]">{suffix}</span>
      </h1>
      <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mx-auto mb-2 leading-tight">
        {algorithm.description}
      </p>

      {/* Complexity Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Time */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#101426] border border-[#1E2640] text-[#F8FAFC]">
          <span className="text-[11px] font-sans text-[#94A3B8]">Time:</span>
          <span className="font-bold text-[#F59E0B]">{algorithm.complexity.average}</span>
        </div>

        {/* Space */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#101426] border border-[#1E2640] text-[#F8FAFC]">
          <span className="text-[11px] font-sans text-[#94A3B8]">Space:</span>
          <span className="font-bold text-[#22D3EE]">{algorithm.complexity.space}</span>
        </div>

        {/* Stable */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#101426] border border-[#1E2640] text-[#F8FAFC]">
          <span className="text-[11px] font-sans text-[#94A3B8]">Stable:</span>
          <span className={`font-bold ${algorithm.complexity.stable ? 'text-[#22C55E]' : 'text-[#94A3B8]'}`}>
            {algorithm.complexity.stable ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
};
