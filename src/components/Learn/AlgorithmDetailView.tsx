import React, { useState } from 'react';
import { ExamAlgorithmData, EXAM_ALGORITHMS, ALGORITHM_EXAM_KEYS } from './examData';

interface AlgorithmDetailViewProps {
  algorithmId: string;
  onSelectAlgorithm: (id: string) => void;
  onBack: () => void;
}

export const AlgorithmDetailView: React.FC<AlgorithmDetailViewProps> = ({
  algorithmId,
  onSelectAlgorithm,
  onBack,
}) => {
  const [copied, setCopied] = useState(false);
  const data: ExamAlgorithmData = EXAM_ALGORITHMS[algorithmId] || EXAM_ALGORITHMS['bubble'];

  const currentIndex = ALGORITHM_EXAM_KEYS.indexOf(algorithmId);
  const prevAlgoKey = currentIndex > 0 ? ALGORITHM_EXAM_KEYS[currentIndex - 1] : null;
  const nextAlgoKey = currentIndex < ALGORITHM_EXAM_KEYS.length - 1 ? ALGORITHM_EXAM_KEYS[currentIndex + 1] : null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2640]">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B5CF6] hover:text-[#c4b5fd] transition-colors mb-2 group"
          >
            <span className="text-sm transition-transform group-hover:-translate-x-1">←</span>
            Back to All Algorithms
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
              {data.name}
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#8B5CF6]/15 text-[#c4b5fd] border border-[#8B5CF6]/40">
              Exam Notes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">{data.shortDesc}</p>
        </div>

        {/* Algorithm Quick Switcher */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-[#101426] border border-[#1E2640] rounded-xl self-start sm:self-center">
          {ALGORITHM_EXAM_KEYS.map((key) => {
            const item = EXAM_ALGORITHMS[key];
            const isActive = key === algorithmId;
            return (
              <button
                key={key}
                onClick={() => onSelectAlgorithm(key)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#181F38]'
                }`}
              >
                {item.name.replace(' Sort', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* 10 Sections in exact requested order */}
      <div className="space-y-6">
        {/* 1. Definition */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              1
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Definition</h3>
          </div>
          <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed pl-8">
            {data.definition}
          </p>
        </section>

        {/* 2. Working / Algorithm */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              2
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Working / Algorithm</h3>
          </div>
          <div className="pl-8 space-y-2.5">
            {data.workingSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-md bg-[#181F38] border border-[#263156] flex items-center justify-center text-[11px] font-mono font-bold text-[#22D3EE]">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Example */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              3
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Example</h3>
          </div>
          <div className="pl-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#94A3B8]">Input Array:</span>
              <code className="px-3 py-1 bg-[#181F38] text-[#F8FAFC] rounded-lg font-mono text-xs sm:text-sm border border-[#263156]">
                {data.example.initialArray}
              </code>
            </div>

            {/* Trace Steps */}
            <div className="space-y-3">
              {data.example.steps.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#080B16] border border-[#1E2640] rounded-xl p-3 sm:p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#22D3EE] font-mono">
                      {st.title}
                    </span>
                    <span className="text-xs font-mono text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/30">
                      {st.arrayState}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-[#22C55E]">Final Sorted Result:</span>
              <code className="px-3 py-1 bg-[#22C55E]/15 text-[#22C55E] rounded-lg font-mono text-xs sm:text-sm border border-[#22C55E]/40 font-bold">
                {data.example.finalResult}
              </code>
            </div>
          </div>
        </section>

        {/* 4. Short Exam Code */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
                4
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">
                Code
              </h3>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-[#181F38] hover:bg-[#20294c] text-[#c4b5fd] border border-[#2b365f] rounded-lg transition-colors"
              title="Copy Python Code"
            >
              <span>{copied ? '✓ Copied!' : '📋 Copy Code'}</span>
            </button>
          </div>
          <div className="pl-8">
            <div className="relative rounded-xl overflow-hidden border border-[#1E2640] bg-[#050711]">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0C0F1E] border-b border-[#1E2640] text-[11px] font-mono text-[#94A3B8]">
                <span>python3</span>
                <span className="text-[#22C55E]">● ready to run</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-[#E2E8F0] leading-relaxed">
                <code>{data.pythonCode}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* 5. Time Complexity */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              5
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Time Complexity</h3>
          </div>
          <div className="pl-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-[#080B16] border border-[#1E2640] rounded-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                Best Case
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#22C55E] block">
                {data.timeComplexity.best}
              </span>
              {data.timeComplexity.bestNote && (
                <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                  {data.timeComplexity.bestNote}
                </p>
              )}
            </div>

            <div className="p-3.5 bg-[#080B16] border border-[#1E2640] rounded-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                Average Case
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#22D3EE] block">
                {data.timeComplexity.average}
              </span>
              <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                Typical random input order
              </p>
            </div>

            <div className="p-3.5 bg-[#080B16] border border-[#1E2640] rounded-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                Worst Case
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#EF4444] block">
                {data.timeComplexity.worst}
              </span>
              {data.timeComplexity.worstNote && (
                <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                  {data.timeComplexity.worstNote}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 6. Space Complexity */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              6
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Space Complexity</h3>
          </div>
          <div className="pl-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#F59E0B]/15 text-[#F59E0B] font-mono font-bold text-base border border-[#F59E0B]/40 self-start">
              {data.spaceComplexity.value}
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {data.spaceComplexity.explanation}
            </p>
          </div>
        </section>

        {/* 7. Stable? */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              7
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Stable?</h3>
          </div>
          <div className="pl-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <span
              className={`px-3.5 py-1.5 rounded-lg font-mono font-bold text-sm border self-start ${
                data.stable
                  ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/40'
                  : 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/40'
              }`}
            >
              {data.stable ? 'Yes (Stable)' : 'No (Unstable)'}
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {data.stabilityExplanation}
            </p>
          </div>
        </section>

        {/* 8. Advantages */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              8
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Advantages</h3>
          </div>
          <ul className="pl-8 space-y-2">
            {data.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                <span className="text-[#22C55E] mt-0.5 font-bold">✓</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 9. Disadvantages */}
        <section className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-xs font-bold text-[#c4b5fd]">
              9
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC]">Disadvantages</h3>
          </div>
          <ul className="pl-8 space-y-2">
            {data.disadvantages.map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                <span className="text-[#EF4444] mt-0.5 font-bold">✗</span>
                <span>{dis}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 10. Exam Tip */}
        <section className="bg-gradient-to-r from-[#1E1738] to-[#101426] border border-[#8B5CF6] rounded-2xl p-5 sm:p-6 shadow-md">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-6 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shadow-md shadow-[#8B5CF6]/40">
              10
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] flex items-center gap-2">
              <span>Exam Tip</span>
              <span className="text-xs font-normal text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/30">
                ★ Must Remember
              </span>
            </h3>
          </div>
          <div className="pl-8">
            <p className="text-xs sm:text-sm text-[#E2E8F0] font-medium leading-relaxed bg-[#080B16]/60 p-3.5 rounded-xl border border-[#8B5CF6]/30">
              💡 {data.examTip}
            </p>
          </div>
        </section>
      </div>

      {/* Bottom Pager Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-[#1E2640]">
        {prevAlgoKey ? (
          <button
            onClick={() => onSelectAlgorithm(prevAlgoKey)}
            className="px-4 py-2 rounded-xl bg-[#101426] hover:bg-[#181F38] border border-[#1E2640] text-xs font-semibold text-[#CBD5E1] transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>{EXAM_ALGORITHMS[prevAlgoKey].name}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/40 text-xs font-semibold text-[#c4b5fd] transition-colors"
        >
          Overview Table
        </button>

        {nextAlgoKey ? (
          <button
            onClick={() => onSelectAlgorithm(nextAlgoKey)}
            className="px-4 py-2 rounded-xl bg-[#101426] hover:bg-[#181F38] border border-[#1E2640] text-xs font-semibold text-[#CBD5E1] transition-colors flex items-center gap-2"
          >
            <span>{EXAM_ALGORITHMS[nextAlgoKey].name}</span>
            <span>→</span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
