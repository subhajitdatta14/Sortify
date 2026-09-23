import { AlgorithmId, SortStep } from '../types';
import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateInsertionSortSteps } from './insertionSort';
import { generateMergeSortSteps } from './mergeSort';
import { generateQuickSortSteps } from './quickSort';
import { generateHeapSortSteps } from './heapSort';

export function generateSteps(algorithmId: AlgorithmId, array: number[]): SortStep[] {
  switch (algorithmId) {
    case 'bubble':
      return generateBubbleSortSteps(array);
    case 'selection':
      return generateSelectionSortSteps(array);
    case 'insertion':
      return generateInsertionSortSteps(array);
    case 'merge':
      return generateMergeSortSteps(array);
    case 'quick':
      return generateQuickSortSteps(array);
    case 'heap':
      return generateHeapSortSteps(array);
    default:
      return generateBubbleSortSteps(array);
  }
}
