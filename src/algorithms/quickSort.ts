import { SortStep } from '../types';

export function generateQuickSortSteps(initialArray: number[]): SortStep[] {
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
    operation: 'Start quick sort — choose a pivot, partition elements around it, and recurse.',
    comparisons,
    writes,
  });

  function partition(low: number, high: number): number {
    const pivotVal = a[high];
    const pivotIdx = high;

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: pivotIdx,
      sorted: [...sorted],
      pseudocodeLine: 8,
      operation: `Partitioning subarray [${low}..${high}]. Chosen pivot: ${pivotVal} at index ${high}.`,
      comparisons,
      writes,
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;

      steps.push({
        array: [...a],
        comparing: [j, high],
        swapping: [],
        pivot: pivotIdx,
        sorted: [...sorted],
        pseudocodeLine: 9,
        operation: `Comparing a[${j}] (${a[j]}) with pivot ${pivotVal}.`,
        comparisons,
        writes,
      });

      if (a[j] <= pivotVal) {
        i++;
        if (i !== j) {
          writes++;
          const temp = a[i];
          a[i] = a[j];
          a[j] = temp;

          steps.push({
            array: [...a],
            comparing: [],
            swapping: [i, j],
            pivot: pivotIdx,
            sorted: [...sorted],
            pseudocodeLine: 9,
            operation: `Swapped smaller element ${a[i]} into left partition index ${i}.`,
            comparisons,
            writes,
          });
        }
      }
    }

    // Place pivot in its correct spot
    const finalPivotIdx = i + 1;
    if (finalPivotIdx !== high) {
      writes++;
      const temp = a[finalPivotIdx];
      a[finalPivotIdx] = a[high];
      a[high] = temp;

      steps.push({
        array: [...a],
        comparing: [],
        swapping: [finalPivotIdx, high],
        pivot: finalPivotIdx,
        sorted: [...sorted],
        pseudocodeLine: 10,
        operation: `Placed pivot ${pivotVal} at its correct partition boundary index ${finalPivotIdx}.`,
        comparisons,
        writes,
      });
    }

    if (!sorted.includes(finalPivotIdx)) {
      sorted.push(finalPivotIdx);
    }

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: null,
      sorted: [...sorted],
      pseudocodeLine: 10,
      operation: `Pivot ${pivotVal} is now locked in place at index ${finalPivotIdx}.`,
      comparisons,
      writes,
    });

    return finalPivotIdx;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const p = partition(low, high);
      quickSort(low, p - 1);
      quickSort(p + 1, high);
    } else if (low === high) {
      if (!sorted.includes(low)) {
        sorted.push(low);
      }
    }
  }

  quickSort(0, n - 1);

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: allSorted,
    pseudocodeLine: 4,
    operation: 'Sorting complete! Partitions recursively aligned into fully sorted order.',
    comparisons,
    writes,
  });

  return steps;
}
