import React from 'react';
import { SortStep, MotionMode } from '../../types';
import { SortifyRobot } from '../SortifyRobot';
import { BarChart } from './BarChart';
import { VisualizerControls } from './VisualizerControls';

interface VisualizerCardProps {
  currentStepData: SortStep;
  currentStepIndex: number;
  totalSteps: number;
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

export const VisualizerCard: React.FC<VisualizerCardProps> = ({
  currentStepData,
  currentStepIndex,
  totalSteps,
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
  return (
    <div className="w-full bg-[#101426] border border-[#8B5CF6] rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Top Header Row of Card */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#94A3B8] font-semibold">
            CURRENT STEP {currentStepIndex + 1} OF {totalSteps}
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#F8FAFC] leading-snug">
            {currentStepData.operation}
          </h2>
        </div>

        {/* Mascot Robot */}
        <div className="shrink-0 p-1 bg-[#141930] rounded-xl border border-[#8B5CF6]/50">
          <SortifyRobot size={46} glow />
        </div>
      </div>

      {/* Main Bar Chart */}
      <div className="w-full bg-[#080B16] rounded-xl border border-[#181E36] my-3">
        <BarChart
          array={currentStepData.array}
          comparing={currentStepData.comparing}
          swapping={currentStepData.swapping}
          pivot={currentStepData.pivot}
          sorted={currentStepData.sorted}
          motionMode={motionMode}
        />
      </div>

      {/* Controls & Configuration */}
      <VisualizerControls
        isPlaying={isPlaying}
        canStepBack={canStepBack}
        canStepForward={canStepForward}
        isComplete={isComplete}
        onStartPause={onStartPause}
        onStepBack={onStepBack}
        onStepForward={onStepForward}
        onReset={onReset}
        onShuffle={onShuffle}
        motionMode={motionMode}
        onToggleMotion={onToggleMotion}
        speed={speed}
        onSpeedChange={onSpeedChange}
        arraySize={arraySize}
        onArraySizeChange={onArraySizeChange}
        minValue={minValue}
        maxValue={maxValue}
        onRangeChange={onRangeChange}
        onApplyCustomArray={onApplyCustomArray}
      />
    </div>
  );
};
