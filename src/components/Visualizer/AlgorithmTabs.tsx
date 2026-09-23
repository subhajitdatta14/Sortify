import React from 'react';
import { AlgorithmId } from '../../types';
import { ALGORITHM_ORDER } from '../../algorithms/definitions';

interface AlgorithmTabsProps {
  selectedId: AlgorithmId;
  onSelect: (id: AlgorithmId) => void;
  disabled?: boolean;
}

export const AlgorithmTabs: React.FC<AlgorithmTabsProps> = ({
  selectedId,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-1 touch-pan-x overscroll-x-contain">
      <div className="flex items-center justify-start sm:justify-center min-w-max gap-1.5 sm:gap-2.5 mx-auto px-1 sm:px-0">
        {ALGORITHM_ORDER.map((algo) => {
          const isActive = selectedId === algo.id;
          return (
            <button
              key={algo.id}
              onClick={() => onSelect(algo.id)}
              disabled={disabled}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] text-[#F8FAFC] font-semibold shadow-[0_0_12px_rgba(139,92,246,0.25)]'
                  : 'bg-[#101426] border border-[#1E2640] text-[#94A3B8] hover:border-[#8B5CF6]/50 hover:text-[#F8FAFC]'
              }`}
            >
              {algo.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
