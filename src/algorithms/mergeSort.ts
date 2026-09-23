import { SortStep } from '../types';

export function generateMergeSortSteps(initialArray: number[]): SortStep[] {
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
    operation: 'Start merge sort — recursively divide array into halves, then merge sorted subarrays.',
    comparisons,
    writes,
  });

  function merge(left: number, mid: number, right: number) {
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: mid,
      sorted: [...sorted],
      pseudocodeLine: 8,
      operation: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}].`,
      comparisons,
      writes,
    });

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const leftIdx = left + i;
      const rightIdx = mid + 1 + j;

      steps.push({
        array: [...a],
        comparing: [leftIdx, rightIdx],
        swapping: [],
        pivot: mid,
        sorted: [...sorted],
        pseudocodeLine: 9,
        operation: `Comparing left element ${leftArr[i]} with right element ${rightArr[j]}.`,
        comparisons,
        writes,
      });

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        writes++;

        steps.push({
          array: [...a],
          comparing: [],
          swapping: [k],
          pivot: mid,
          sorted: [...sorted],
          pseudocodeLine: 10,
          operation: `Placed smaller element ${leftArr[i]} at index ${k}.`,
          comparisons,
          writes,
        });

        i++;
      } else {
        a[k] = rightArr[j];
        writes++;

        steps.push({
          array: [...a],
          comparing: [],
          swapping: [k],
          pivot: mid,
          sorted: [...sorted],
          pseudocodeLine: 10,
          operation: `Placed smaller element ${rightArr[j]} at index ${k}.`,
          comparisons,
          writes,
        });

        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i];
      writes++;

      steps.push({
        array: [...a],
        comparing: [],
        swapping: [k],
        pivot: null,
        sorted: [...sorted],
        pseudocodeLine: 10,
        operation: `Copied remaining left element ${leftArr[i]} to index ${k}.`,
        comparisons,
        writes,
      });

      i++;
      k++;
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j];
      writes++;

      steps.push({
        array: [...a],
        comparing: [],
        swapping: [k],
        pivot: null,
        sorted: [...sorted],
        pseudocodeLine: 10,
        operation: `Copied remaining right element ${rightArr[j]} to index ${k}.`,
        comparisons,
        writes,
      });

      j++;
      k++;
    }

    // If this merge covers the entire array
    if (left === 0 && right === n - 1) {
      for (let idx = 0; idx < n; idx++) {
        if (!sorted.includes(idx)) sorted.push(idx);
      }
    }
  }

  function mergeSort(left: number, right: number) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: mid,
      sorted: [...sorted],
      pseudocodeLine: 3,
      operation: `Dividing range [${left}..${right}] at midpoint ${mid}.`,
      comparisons,
      writes,
    });

    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    merge(left, mid, right);
  }

  mergeSort(0, n - 1);

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: allSorted,
    pseudocodeLine: 6,
    operation: 'Sorting complete! Merged subarrays now form a fully sorted array.',
    comparisons,
    writes,
  });

  return steps;
}
