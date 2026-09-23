import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AlgorithmId, MotionMode } from '../../types';
import { ALGORITHMS } from '../../algorithms/definitions';
import { generateSteps } from '../../algorithms';
import { generateRandomArray } from '../../utils/arrayUtils';
import { AlgorithmHeader } from './AlgorithmHeader';
import { AlgorithmTabs } from './AlgorithmTabs';
import { VisualizerCard } from './VisualizerCard';
import { StatCards } from './StatCards';
import { PseudocodePanel } from './PseudocodePanel';

export const VisualizerPage: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState<AlgorithmId>('bubble');
  const [arraySize, setArraySize] = useState<number>(12);
  const [minValue, setMinValue] = useState<number>(5);
  const [maxValue, setMaxValue] = useState<number>(99);
  const [speed, setSpeed] = useState<number>(320);
  const [motionMode, setMotionMode] = useState<MotionMode>('full');

  // Arrays and Steps
  const [currentArray, setCurrentArray] = useState<number[]>(() =>
    generateRandomArray(12, 5, 99)
  );
  const [steps, setSteps] = useState(() =>
    generateSteps('bubble', currentArray)
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);

  // Recalculate steps whenever algorithm or initial current array changes
  const regenerateSteps = useCallback((algoId: AlgorithmId, arr: number[]) => {
    const newSteps = generateSteps(algoId, arr);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, []);

  // Algorithm selection
  const handleSelectAlgorithm = (id: AlgorithmId) => {
    setSelectedAlgoId(id);
    regenerateSteps(id, currentArray);
  };

  // Array size change
  const handleArraySizeChange = (newSize: number) => {
    setArraySize(newSize);
    const newArr = generateRandomArray(newSize, minValue, maxValue);
    setCurrentArray(newArr);
    regenerateSteps(selectedAlgoId, newArr);
  };

  // Range change
  const handleRangeChange = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max);
    const newArr = generateRandomArray(arraySize, min, max);
    setCurrentArray(newArr);
    regenerateSteps(selectedAlgoId, newArr);
  };

  // Shuffle array
  const handleShuffle = () => {
    const newArr = generateRandomArray(arraySize, minValue, maxValue);
    setCurrentArray(newArr);
    regenerateSteps(selectedAlgoId, newArr);
  };

  // Reset to initial
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Apply custom array
  const handleApplyCustomArray = (numbers: number[]): { success: boolean; error?: string } => {
    if (numbers.length < 2) {
      return { success: false, error: 'At least 2 numbers required.' };
    }
    setArraySize(numbers.length);
    setCurrentArray(numbers);
    regenerateSteps(selectedAlgoId, numbers);
    return { success: true };
  };

  // Step Controls
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleStartPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      // If completed, restart from 0
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleToggleMotion = () => {
    setMotionMode((prev) => {
      if (prev === 'full') return 'subtle';
      if (prev === 'subtle') return 'instant';
      return 'full';
    });
  };

  // Playback timer effect
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, speed, steps.length]);

  const currentAlgorithm = ALGORITHMS[selectedAlgoId];
  const currentStepData = steps[currentStepIndex] || steps[0];
  const isComplete = currentStepIndex >= steps.length - 1;

  // Writes label customization
  const writesLabel =
    selectedAlgoId === 'merge' || selectedAlgoId === 'insertion'
      ? 'WRITES / MOVES'
      : 'SWAPS / WRITES';

  return (
    <div className="w-full max-w-[1180px] mx-auto px-4 sm:px-6 py-2">
      {/* Algorithm Header */}
      <AlgorithmHeader algorithm={currentAlgorithm} />

      {/* Algorithm Selector Tabs */}
      <div className="mb-6">
        <AlgorithmTabs
          selectedId={selectedAlgoId}
          onSelect={handleSelectAlgorithm}
          disabled={isPlaying}
        />
      </div>

      {/* Visualizer Card */}
      <VisualizerCard
        currentStepData={currentStepData}
        currentStepIndex={currentStepIndex}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        canStepBack={currentStepIndex > 0}
        canStepForward={currentStepIndex < steps.length - 1}
        isComplete={isComplete}
        onStartPause={handleStartPause}
        onStepBack={handleStepBack}
        onStepForward={handleStepForward}
        onReset={handleReset}
        onShuffle={handleShuffle}
        motionMode={motionMode}
        onToggleMotion={handleToggleMotion}
        speed={speed}
        onSpeedChange={setSpeed}
        arraySize={arraySize}
        onArraySizeChange={handleArraySizeChange}
        minValue={minValue}
        maxValue={maxValue}
        onRangeChange={handleRangeChange}
        onApplyCustomArray={handleApplyCustomArray}
      />

      {/* Statistics Cards */}
      <StatCards
        comparisons={currentStepData.comparisons}
        writes={currentStepData.writes}
        writesLabel={writesLabel}
        currentStep={currentStepIndex + 1}
        totalSteps={steps.length}
        arraySize={currentStepData.array.length}
      />

      {/* Pseudocode Panel */}
      <PseudocodePanel
        algorithm={currentAlgorithm}
        activeLine={currentStepData.pseudocodeLine}
      />
    </div>
  );
};
