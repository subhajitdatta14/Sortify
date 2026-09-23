import React, { useState } from 'react';
import { PracticeQuestion } from '../../types';

interface PracticeQuestionCardProps {
  question: PracticeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onSelectOption: (questionId: number, optionId: string) => void;
}

export const PracticeQuestionCard: React.FC<PracticeQuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSelectOption,
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);

  return (
    <div className="bg-[#101426] border border-[#8B5CF6] rounded-2xl p-4 sm:p-6 shadow-lg space-y-4">
      {/* Title */}
      <h3 className="text-sm sm:text-base font-bold text-[#F8FAFC] leading-relaxed">
        {question.title}
      </h3>

      {/* Options list */}
      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isSelected = question.userSelectedOptionId === opt.id;
          const isCorrect = opt.isCorrect;
          const isAnswered = question.isAnswered;

          let btnStyle =
            'bg-[#080B16] border border-[#1E2640] text-[#F8FAFC] hover:border-[#8B5CF6]/60 hover:bg-[#141930]';

          if (isAnswered) {
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E] font-semibold shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                : 'bg-[#EF4444]/20 border-2 border-[#EF4444] text-[#EF4444] font-semibold shadow-[0_0_10px_rgba(239,68,68,0.3)]';
            } else if (isCorrect) {
              btnStyle =
                'bg-[#22C55E]/10 border border-[#22C55E]/70 text-[#22C55E] font-medium';
            } else {
              btnStyle = 'bg-[#080B16]/60 border border-[#181E36] text-[#64748B] opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => {
                if (!question.isAnswered) {
                  onSelectOption(question.id, opt.id);
                }
              }}
              disabled={question.isAnswered}
              className={`w-full text-left px-4 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition-all font-mono flex items-center justify-between ${btnStyle} ${
                !question.isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
              }`}
            >
              <span>{opt.text}</span>
              {isAnswered && isSelected && (
                <span className="text-xs font-sans font-bold ml-2">
                  {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hint toggle and content */}
      <div className="pt-1">
        <button
          onClick={() => setShowHint((prev) => !prev)}
          className="text-xs text-[#94A3B8] hover:text-[#8B5CF6] font-medium px-3 py-1 rounded-full border border-[#1E2640] hover:border-[#8B5CF6]/50 transition-colors"
        >
          {showHint
            ? `Hide hint (${questionNumber} of ${totalQuestions})`
            : `Show hint ${questionNumber} of ${totalQuestions}`}
        </button>

        {showHint && (
          <div className="mt-2.5 p-3 rounded-xl bg-[#080B16] border border-[#181E36] text-xs text-[#c4b5fd] leading-relaxed animate-fadeIn">
            <span className="font-semibold text-[#8B5CF6] mr-1.5">Hint:</span>
            {question.hint}
          </div>
        )}

        {question.isAnswered && (
          <div className="mt-2.5 p-3 rounded-xl bg-[#080B16] border border-[#181E36] text-xs text-[#94A3B8] leading-relaxed">
            <span className="font-semibold text-[#F8FAFC] mr-1.5">Explanation:</span>
            {question.explanation}
          </div>
        )}
      </div>
    </div>
  );
};
