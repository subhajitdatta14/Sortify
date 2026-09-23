import React, { useState, useEffect } from 'react';
import { AlgorithmId, PracticeQuestion } from '../../types';
import { SortifyRobot } from '../SortifyRobot';
import { AlgorithmTabs } from '../Visualizer/AlgorithmTabs';
import { generatePracticeQuestions } from '../../utils/practiceGenerator';
import { PracticeQuestionCard } from './PracticeQuestionCard';

export const PracticePage: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<AlgorithmId>('bubble');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [score, setScore] = useState<number>(0);

  // Initialize practice session
  const initSession = (algoId: AlgorithmId) => {
    const { questions: newQuestions } = generatePracticeQuestions(algoId);
    setQuestions(newQuestions);
    setScore(0);
  };

  useEffect(() => {
    initSession(selectedAlgoId);
  }, [selectedAlgoId]);

  const handleSelectOption = (questionId: number, optionId: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        if (q.id === questionId && !q.isAnswered) {
          const selectedOpt = q.options.find((o) => o.id === optionId);
          const isCorrect = selectedOpt ? selectedOpt.isCorrect : false;
          if (isCorrect) {
            setScore((prev) => prev + 1);
          }
          return {
            ...q,
            isAnswered: true,
            userSelectedOptionId: optionId,
            isCorrect,
          };
        }
        return q;
      })
    );
  };

  const handleNewList = () => {
    initSession(selectedAlgoId);
  };

  return (
    <div className="w-full max-w-[1020px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="p-1.5 bg-[#141930] rounded-xl border border-[#8B5CF6]/50">
          <SortifyRobot size={44} glow />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Practice mode
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Every answer is checked against a real run of the algorithm.
          </p>
        </div>
      </div>

      {/* Algorithm selector */}
      <div>
        <AlgorithmTabs
          selectedId={selectedAlgoId}
          onSelect={(id) => setSelectedAlgoId(id)}
        />
      </div>

      {/* Score & New List Row */}
      <div className="bg-[#101426] border border-[#8B5CF6] rounded-xl px-4 py-3.5 flex items-center justify-between shadow-md">
        <div className="text-sm font-semibold text-[#94A3B8]">
          Score:{' '}
          <span className="font-mono text-[#8B5CF6] font-bold text-base ml-1">
            {score}
          </span>{' '}
          <span className="text-[#64748B]">/ 3</span>
        </div>

        <button
          onClick={handleNewList}
          className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/15 cursor-pointer transition-colors"
        >
          New list
        </button>
      </div>

      {/* Question Cards */}
      <div className="space-y-4">
        {questions.map((q, idx) => (
          <PracticeQuestionCard
            key={q.id}
            question={q}
            questionNumber={idx + 1}
            totalQuestions={questions.length}
            onSelectOption={handleSelectOption}
          />
        ))}
      </div>
    </div>
  );
};
