import { SortStep } from '../types';

export function generateSelectionSortSteps(initialArray: number[]): SortStep[] {
  const a = [...initialArray];
  const steps: SortStep[] = [];
  const n = a.length;
  let comparisons = 0;
  let writes = 0;
  const sorted: number[] = [];

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: [...sorted],
    pseudocodeLine: 1,
    operation: 'Start selection sort — find minimum of unsorted region and swap it to front.',
    comparisons,
    writes,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...a],
      comparing: [i],
      swapping: [],
      pivot: minIdx,
      sorted: [...sorted],
      pseudocodeLine: 4,
      operation: `Current minimum initialized to index ${i} (value ${a[i]}).`,
      comparisons,
      writes,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      steps.push({
        array: [...a],
        comparing: [j, minIdx],
        swapping: [],
        pivot: minIdx,
        sorted: [...sorted],
        pseudocodeLine: 6,
        operation: `Comparing a[${j}] (${a[j]}) with current minimum a[${minIdx}] (${a[minIdx]}).`,
        comparisons,
        writes,
      });

      if (a[j] < a[minIdx]) {
        minIdx = j;

        steps.push({
          array: [...a],
          comparing: [],
          swapping: [],
          pivot: minIdx,
          sorted: [...sorted],
          pseudocodeLine: 7,
          operation: `New minimum found: value ${a[minIdx]} at index ${minIdx}.`,
          comparisons,
          writes,
        });
      }
    }

    if (minIdx !== i) {
      writes++;
      const temp = a[i];
      a[i] = a[minIdx];
      a[minIdx] = temp;

      steps.push({
        array: [...a],
        comparing: [],
        swapping: [i, minIdx],
        pivot: null,
        sorted: [...sorted],
        pseudocodeLine: 9,
        operation: `Swapped minimum ${a[i]} into position ${i}.`,
        comparisons,
        writes,
      });
    }

    sorted.push(i);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: null,
      sorted: [...sorted],
      pseudocodeLine: 3,
      operation: `Index ${i} (${a[i]}) is now finalized and locked in place.`,
      comparisons,
      writes,
    });
  }

  // The last remaining element is automatically sorted
  sorted.push(n - 1);
  const allSorted = Array.from({ length: n }, (_, idx) => idx);

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: allSorted,
    pseudocodeLine: 9,
    operation: 'Sorting complete! All elements are locked in place.',
    comparisons,
    writes,
  });

  return steps;
}
