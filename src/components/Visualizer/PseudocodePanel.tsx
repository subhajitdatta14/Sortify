import React from 'react';
import { AlgorithmDefinition } from '../../types';

interface PseudocodePanelProps {
  algorithm: AlgorithmDefinition;
  activeLine: number;
}

export const PseudocodePanel: React.FC<PseudocodePanelProps> = ({
  algorithm,
  activeLine,
}) => {
  // Simple token highlighter for python pseudocode
  const renderHighlightedLine = (text: string) => {
    // Basic tokens
    const tokens = text.split(/(\b(?:def|for|in|range|if|else|elif|while|break|return|len|True|False)\b|#.*$)/g);

    return tokens.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('#')) {
        return (
          <span key={i} className="text-slate-500 italic">
            {part}
          </span>
        );
      }
      if (
        ['def', 'for', 'in', 'range', 'if', 'else', 'elif', 'while', 'break', 'return', 'len'].includes(
          part
        )
      ) {
        return (
          <span key={i} className="text-[#8B5CF6] font-semibold">
            {part}
          </span>
        );
      }
      if (['True', 'False'].includes(part)) {
        return (
          <span key={i} className="text-[#F59E0B] font-semibold">
            {part}
          </span>
        );
      }
      return (
        <span key={i} className="text-[#F8FAFC]">
          {part}
        </span>
      );
    });
  };

  const worst = algorithm.complexity.worst;
  const best = algorithm.complexity.best;
  const avg = algorithm.complexity.average;

  return (
    <div className="w-full bg-[#101426] border border-[#8B5CF6] rounded-2xl p-4 sm:p-5 shadow-lg mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#181E36]">
        <div className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
          HOW IT WORKS
        </div>
        <div className="text-xs font-mono font-medium flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <span>
            <span className="text-[#94A3B8]">BEST:</span>{' '}
            <span className="text-[#F59E0B] font-semibold">{best}</span>
          </span>
          <span>
            <span className="text-[#94A3B8]">AVG:</span>{' '}
            <span className="text-[#22D3EE] font-semibold">{avg}</span>
          </span>
          <span>
            <span className="text-[#94A3B8]">WORST:</span>{' '}
            <span className="text-[#8B5CF6] font-semibold">{worst}</span>
          </span>
        </div>
      </div>

      {/* Code Box */}
      <div className="bg-[#080B16] rounded-xl border border-[#181E36] p-3 sm:p-4 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
        {algorithm.pseudocode.map((lineItem) => {
          const isActive = activeLine === lineItem.line;
          return (
            <div
              key={lineItem.line}
              className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                isActive
                  ? 'bg-[#8B5CF6]/25 border-l-2 border-[#8B5CF6] text-[#F8FAFC] shadow-[0_0_10px_rgba(139,92,246,0.25)]'
                  : 'hover:bg-[#141930]/40 text-[#94A3B8]'
              }`}
            >
              {/* Line Number */}
              <span
                className={`w-6 sm:w-8 select-none text-right pr-3 shrink-0 text-xs ${
                  isActive ? 'text-[#8B5CF6] font-bold' : 'text-[#64748B]'
                }`}
              >
                {lineItem.line}
              </span>

              {/* Code line */}
              <span className="whitespace-pre">
                {renderHighlightedLine(lineItem.text)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
