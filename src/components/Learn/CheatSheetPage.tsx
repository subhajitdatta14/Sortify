import React, { useState } from 'react';
import { SortifyRobot } from '../SortifyRobot';
import { ComplexityTable } from './ComplexityTable';
import { AlgorithmDetailView } from './AlgorithmDetailView';
import { EXAM_ALGORITHMS, ALGORITHM_EXAM_KEYS } from './examData';

export const CheatSheetPage: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  if (selectedAlgorithm && EXAM_ALGORITHMS[selectedAlgorithm]) {
    return (
      <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6 py-6">
        <AlgorithmDetailView
          algorithmId={selectedAlgorithm}
          onSelectAlgorithm={(id) => setSelectedAlgorithm(id)}
          onBack={() => setSelectedAlgorithm(null)}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-1.5 bg-[#141930] rounded-xl border border-[#8B5CF6]/50">
            <SortifyRobot size={44} glow />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              Learn & Exam Cheat Sheet
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              6 classic sorting algorithms with exam-ready definitions, traces, Python code & tips.
            </p>
          </div>
        </div>

        {/* Quick Jump Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {ALGORITHM_EXAM_KEYS.map((key) => {
            const algo = EXAM_ALGORITHMS[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedAlgorithm(key)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#141930] hover:bg-[#8B5CF6]/20 border border-[#232D52] hover:border-[#8B5CF6]/50 text-[#CBD5E1] hover:text-[#c4b5fd] transition-colors"
              >
                {algo.name.replace(' Sort', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Complexity Comparison Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Comparison Table (Click any row for exam notes)
          </span>
          <span className="text-[11px] text-[#8B5CF6]">
            Interactive
          </span>
        </div>
        <ComplexityTable onSelectAlgorithm={(id) => setSelectedAlgorithm(id)} />
      </div>

      {/* Six Algorithm Cards */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Detailed Exam Guides (Select an algorithm)
          </h2>
          <span className="text-[11px] text-[#64748B]">
            All 10 Exam Sections Included
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALGORITHM_EXAM_KEYS.map((key) => {
            const item = EXAM_ALGORITHMS[key];
            return (
              <div
                key={key}
                onClick={() => setSelectedAlgorithm(key)}
                className="group cursor-pointer bg-[#101426] hover:bg-[#141930] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-[#8B5CF6]/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] group-hover:text-[#c4b5fd] transition-colors">
                      {item.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/30">
                      Avg: {item.timeComplexity.average}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#181E36] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        item.stable
                          ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                          : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                      }`}
                    >
                      {item.stable ? 'Stable' : 'Unstable'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30">
                      Space: {item.spaceComplexity.value}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#8B5CF6] group-hover:text-[#c4b5fd] inline-flex items-center gap-1">
                    Exam Guide <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
