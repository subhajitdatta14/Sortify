export type AlgorithmId =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick'
  | 'heap';

export type PageId = 'visualizer' | 'practice' | 'learn';

export type MotionMode = 'full' | 'subtle' | 'instant';

export interface ComplexityInfo {
  best: string;
  average: string;
  worst: string;
  space: string;
  stable: boolean;
}

export interface AlgorithmDefinition {
  id: AlgorithmId;
  name: string;
  description: string;
  complexity: ComplexityInfo;
  pseudocode: {
    line: number;
    text: string;
    indent: number;
  }[];
  worstCaseNotes?: string;
}

export interface SortStep {
  array: number[];
  comparing: number[]; // indices currently compared
  swapping: number[]; // indices being swapped or moved/written
  pivot: number | null; // pivot index
  sorted: number[]; // indices that are in their finalized/locked position
  pseudocodeLine: number;
  operation: string;
  comparisons: number;
  writes: number; // swaps or writes
}

export interface PracticeOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface PracticeQuestion {
  id: number;
  title: string;
  options: PracticeOption[];
  correctOptionId: string;
  hint: string;
  explanation: string;
  userSelectedOptionId?: string;
  isAnswered: boolean;
  isCorrect?: boolean;
}
