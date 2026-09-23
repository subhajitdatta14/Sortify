import { SortStep } from '../types';

export function generateHeapSortSteps(initialArray: number[]): SortStep[] {
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
    operation: 'Start heap sort — build a max-heap, then repeatedly extract the root maximum to the end.',
    comparisons,
    writes,
  });

  function heapify(size: number, root: number) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [left, largest],
        swapping: [],
        pivot: root,
        sorted: [...sorted],
        pseudocodeLine: 5,
        operation: `Heap check: comparing left child a[${left}] (${a[left]}) with largest a[${largest}] (${a[largest]}).`,
        comparisons,
        writes,
      });

      if (a[left] > a[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      steps.push({
        array: [...a],
        comparing: [right, largest],
        swapping: [],
        pivot: root,
        sorted: [...sorted],
        pseudocodeLine: 5,
        operation: `Heap check: comparing right child a[${right}] (${a[right]}) with largest a[${largest}] (${a[largest]}).`,
        comparisons,
        writes,
      });

      if (a[right] > a[largest]) {
        largest = right;
      }
    }

    if (largest !== root) {
      writes++;
      const temp = a[root];
      a[root] = a[largest];
      a[largest] = temp;

      steps.push({
        array: [...a],
        comparing: [],
        swapping: [root, largest],
        pivot: largest,
        sorted: [...sorted],
        pseudocodeLine: 5,
        operation: `Heapified: swapped parent ${temp} with larger child ${a[root]}.`,
        comparisons,
        writes,
      });

      heapify(size, largest);
    }
  }

  // Build max-heap
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: [...sorted],
    pseudocodeLine: 4,
    operation: 'Phase 1: Building max-heap from bottom up.',
    comparisons,
    writes,
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: [...sorted],
    pseudocodeLine: 6,
    operation: 'Max-heap built! Root a[0] holds the largest value in the heap.',
    comparisons,
    writes,
  });

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    writes++;
    const temp = a[0];
    a[0] = a[i];
    a[i] = temp;

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [0, i],
      pivot: null,
      sorted: [...sorted],
      pseudocodeLine: 8,
      operation: `Swapped max element ${temp} with a[${i}] (${a[0]}).`,
      comparisons,
      writes,
    });

    sorted.push(i);

    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      pivot: null,
      sorted: [...sorted],
      pseudocodeLine: 8,
      operation: `Value ${temp} is now locked in place at index ${i}.`,
      comparisons,
      writes,
    });

    heapify(i, 0);
  }

  sorted.push(0);
  const allSorted = Array.from({ length: n }, (_, idx) => idx);

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    pivot: null,
    sorted: allSorted,
    pseudocodeLine: 9,
    operation: 'Sorting complete! Array is fully ordered.',
    comparisons,
    writes,
  });

  return steps;
}
