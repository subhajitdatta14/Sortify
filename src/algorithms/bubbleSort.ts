import { SortStep } from '../types';

export function generateBubbleSortSteps(initialArray: number[]): SortStep[] {
  const a = [...initialArray];
  const steps: SortStep[] = [];
  const n = a.length;
  let comparisons = 0;
  let writes = 0;
  const sorted: number[] = [];

  // Initial step
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: [...sorted],
    pseudocodeLine: 1,
    operation: 'Start bubble sort — we repeatedly bubble the largest value to the end.',
    comparisons,
    writes,
  });

  if (n <= 1) {
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: null,
      sorted: [0],
      pseudocodeLine: 10,
      operation: 'Sorting complete! Array is fully ordered.',
      comparisons,
      writes,
    });
    return steps;
  }

  for (let p = 0; p < n - 1; p++) {
    let swapped = false;

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: null,
      sorted: [...sorted],
      pseudocodeLine: 3,
      operation: `Pass ${p + 1}: bubbling next largest element up to index ${n - 1 - p}.`,
      comparisons,
      writes,
    });

    for (let i = 0; i < n - 1 - p; i++) {
      comparisons++;

      // Step: comparing
      steps.push({
        array: [...a],
        comparing: [i, i + 1],
        swapping: [],
        pivot: null,
        sorted: [...sorted],
        pseudocodeLine: 6,
        operation: `Comparing a[${i}] (${a[i]}) and a[${i + 1}] (${a[i + 1]}).`,
        comparisons,
        writes,
      });

      if (a[i] > a[i + 1]) {
        // Swap
        writes++;
        const temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;

        steps.push({
          array: [...a],
          comparing: [],
          swapping: [i, i + 1],
          pivot: null,
          sorted: [...sorted],
          pseudocodeLine: 7,
          operation: `Out of order (${temp} > ${a[i]}): swapped indices ${i} and ${i + 1}.`,
          comparisons,
          writes,
        });
      }
    }

    const lockedIndex = n - 1 - p;
    sorted.push(lockedIndex);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: null,
      sorted: [...sorted],
      pseudocodeLine: 3,
      operation: `Value ${a[lockedIndex]} is now locked at index ${lockedIndex}.`,
      comparisons,
      writes,
    });

    if (!swapped) {
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        pivot: null,
        sorted: Array.from({ length: n }, (_, idx) => idx),
        pseudocodeLine: 10,
        operation: 'No swaps occurred during this pass — array is already sorted!',
        comparisons,
        writes,
      });
      return steps;
    }
  }

  // All elements are sorted
  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: allSorted,
    pseudocodeLine: 10,
    operation: 'Sorting complete! All elements are locked in place.',
    comparisons,
    writes,
  });

  return steps;
}
