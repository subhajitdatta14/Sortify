import React from 'react';
import { ALGORITHM_ORDER } from '../../algorithms/definitions';

interface ComplexityTableProps {
  onSelectAlgorithm?: (id: string) => void;
}

export const ComplexityTable: React.FC<ComplexityTableProps> = ({ onSelectAlgorithm }) => {
  return (
    <div className="w-full bg-[#101426] border border-[#8B5CF6] rounded-2xl p-4 sm:p-5 shadow-lg overflow-hidden">
      <div className="overflow-x-auto no-scrollbar touch-pan-x overscroll-x-contain">
        <table className="w-full text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="border-b border-[#181E36] text-[11px] font-sans font-bold tracking-wider text-[#94A3B8] uppercase">
              <th className="py-3 px-3">Algorithm</th>
              <th className="py-3 px-3">Best</th>
              <th className="py-3 px-3">Average</th>
              <th className="py-3 px-3">Worst</th>
              <th className="py-3 px-3">Space</th>
              <th className="py-3 px-3">Stable</th>
              {onSelectAlgorithm && <th className="py-3 px-3 text-right">Exam Guide</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181E36] font-mono text-xs sm:text-sm">
            {ALGORITHM_ORDER.map((algo) => (
              <tr
                key={algo.id}
                onClick={() => onSelectAlgorithm?.(algo.id)}
                className={`transition-colors ${
                  onSelectAlgorithm
                    ? 'hover:bg-[#141930] cursor-pointer group'
                    : 'hover:bg-[#141930]/60'
                }`}
              >
                <td className="py-3 px-3 font-sans font-bold text-[#F8FAFC] whitespace-nowrap group-hover:text-[#c4b5fd] transition-colors">
                  {algo.name}
                </td>
                <td className="py-3 px-3 text-[#94A3B8]">
                  {algo.complexity.best}
                </td>
                <td className="py-3 px-3 text-[#22D3EE] font-semibold">
                  {algo.complexity.average}
                </td>
                <td className="py-3 px-3 text-[#94A3B8]">
                  {algo.complexity.worst}
                </td>
                <td className="py-3 px-3 text-[#F59E0B] font-semibold whitespace-nowrap">
                  {algo.id === 'quick'
                    ? 'O(log n) avg / O(n) worst'
                    : algo.complexity.space}
                </td>
                <td className="py-3 px-3 font-sans text-xs">
                  <span
                    className={`inline-block px-2 py-0.5 rounded ${
                      algo.complexity.stable
                        ? 'text-[#22C55E] bg-[#22C55E]/15 border border-[#22C55E]/40'
                        : 'text-[#94A3B8] bg-[#080B16] border border-[#1E2640]'
                    }`}
                  >
                    {algo.complexity.stable ? 'Yes' : 'No'}
                  </span>
                </td>
                {onSelectAlgorithm && (
                  <td className="py-3 px-3 font-sans text-xs text-right">
                    <span className="text-[#8B5CF6] group-hover:text-[#c4b5fd] font-semibold inline-flex items-center gap-1">
                      Notes <span>→</span>
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

