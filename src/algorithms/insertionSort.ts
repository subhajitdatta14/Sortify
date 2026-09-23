import { SortStep } from '../types';

export function generateInsertionSortSteps(initialArray: number[]): SortStep[] {
  const a = [...initialArray];
  const steps: SortStep[] = [];
  const n = a.length;
  let comparisons = 0;
  let writes = 0;

  // Initial step before starting — keep sorted empty so bars do not show green before start
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: [],
    pseudocodeLine: 1,
    operation: 'Ready to start insertion sort — select Start or Step Forward.',
    comparisons,
    writes,
  });

  // Prefix [0] becomes sorted once the algorithm begins
  const sorted: number[] = [0];

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: i,
      sorted: [...sorted],
      pseudocodeLine: 4,
      operation: `Selected key ${key} at index ${i} to insert into sorted prefix.`,
      comparisons,
      writes,
    });

    while (j >= 0) {
      comparisons++;

      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapping: [],
        pivot: j + 1,
        sorted: [...sorted],
        pseudocodeLine: 6,
        operation: `Comparing key (${key}) with sorted element a[${j}] (${a[j]}).`,
        comparisons,
        writes,
      });

      if (a[j] > key) {
        a[j + 1] = a[j];
        writes++;

        steps.push({
          array: [...a],
          comparing: [],
          swapping: [j, j + 1],
          pivot: j,
          sorted: [...sorted],
          pseudocodeLine: 7,
          operation: `Shifted ${a[j + 1]} right into index ${j + 1}.`,
          comparisons,
          writes,
        });

        j--;
      } else {
        break;
      }
    }

    a[j + 1] = key;
    writes++;

    // Add i to sorted prefix
    if (!sorted.includes(i)) {
      sorted.push(i);
    }
    sorted.sort((x, y) => x - y);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [j + 1],
      pivot: null,
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      pseudocodeLine: 9,
      operation: `Inserted key ${key} into position ${j + 1}. Prefix up to index ${i} is now sorted.`,
      comparisons,
      writes,
    });
  }

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: allSorted,
    pseudocodeLine: 9,
    operation: 'Sorting complete! Entire array is sorted.',
    comparisons,
    writes,
  });

  return steps;
}
