export interface ExamAlgorithmData {
  id: string;
  name: string;
  shortDesc: string;
  definition: string;
  workingSteps: string[];
  example: {
    initialArray: string;
    steps: { title: string; desc: string; arrayState: string }[];
    finalResult: string;
  };
  pythonCode: string;
  timeComplexity: {
    best: string;
    bestNote?: string;
    average: string;
    worst: string;
    worstNote?: string;
  };
  spaceComplexity: {
    value: string;
    explanation: string;
  };
  stable: boolean;
  stabilityExplanation: string;
  advantages: string[];
  disadvantages: string[];
  examTip: string;
}

export const EXAM_ALGORITHMS: Record<string, ExamAlgorithmData> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    shortDesc: 'Repeatedly swaps adjacent out-of-order pairs until sorted.',
    definition:
      'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This pass-through process is repeated until no swaps are needed, causing larger values to "bubble up" to their correct positions at the end of the array.',
    workingSteps: [
      'Start at index 0 and compare adjacent elements arr[j] and arr[j + 1].',
      'If arr[j] > arr[j + 1], swap them; otherwise, keep their positions unchanged.',
      'Move to the next adjacent pair and repeat until the end of the unsorted portion. After Pass 1, the largest element is placed at its final position at the end.',
      'Repeat the process for n - 1 passes, each time ignoring the already settled elements at the end.',
      'Optimization (Early Exit): If a complete pass finishes without any swaps (swapped == False), the array is already sorted; stop immediately.',
    ],
    example: {
      initialArray: '[5, 3, 8, 1]',
      steps: [
        {
          title: 'Pass 1',
          desc: 'Compare (5, 3) -> 5 > 3, swap -> [3, 5, 8, 1]. Compare (5, 8) -> 5 < 8, no swap. Compare (8, 1) -> 8 > 1, swap -> [3, 5, 1, 8].',
          arrayState: '[3, 5, 1, 8] (8 is fixed at the end)',
        },
        {
          title: 'Pass 2',
          desc: 'Compare (3, 5) -> 3 < 5, no swap. Compare (5, 1) -> 5 > 1, swap -> [3, 1, 5, 8].',
          arrayState: '[3, 1, 5, 8] (5 is fixed)',
        },
        {
          title: 'Pass 3',
          desc: 'Compare (3, 1) -> 3 > 1, swap -> [1, 3, 5, 8].',
          arrayState: '[1, 3, 5, 8] (Array is completely sorted)',
        },
      ],
      finalResult: '[1, 3, 5, 8]',
    },
    pythonCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swaps occurred, array is already sorted
        if not swapped:
            break
    return arr

# Test
print(bubble_sort([5, 3, 8, 1]))  # Output: [1, 3, 5, 8]`,
    timeComplexity: {
      best: 'O(n)',
      bestNote: 'When array is already sorted (with swapped flag)',
      average: 'O(n²)',
      worst: 'O(n²)',
      worstNote: 'When array is sorted in reverse order',
    },
    spaceComplexity: {
      value: 'O(1)',
      explanation: 'In-place sorting algorithm requiring only constant auxiliary variables.',
    },
    stable: true,
    stabilityExplanation: 'Yes. Only swaps adjacent elements when arr[j] > arr[j+1], so equal elements maintain their relative order.',
    advantages: [
      'Very simple to understand and implement for beginners.',
      'In-place algorithm requiring O(1) auxiliary memory.',
      'Detects an already sorted array in linear O(n) time using the swapped flag.',
    ],
    disadvantages: [
      'Very slow and inefficient for large datasets due to quadratic O(n²) time complexity.',
      'Performs excessive comparisons and element swaps compared to other algorithms.',
    ],
    examTip:
      'Remember: "Adjacent comparison & bubbling." In the i-th pass, the i-th largest element bubbles to its final position at the end. Always mention the swapped flag in exams for best-case O(n) marks!',
  },

  selection: {
    id: 'selection',
    name: 'Selection Sort',
    shortDesc: 'Repeatedly finds the smallest remaining value and swaps it to the front.',
    definition:
      'Selection Sort is an in-place comparison sorting algorithm that divides the array into a sorted and an unsorted region. In each pass, it selects the minimum element from the unsorted region and swaps it with the first element of that unsorted region.',
    workingSteps: [
      'Divide the array conceptually into a sorted prefix (initially empty) and an unsorted suffix.',
      'Set min_idx = i as the index of the first element in the unsorted portion.',
      'Iterate through the remaining unsorted elements (j from i + 1 to n - 1) to find the index containing the minimum value.',
      'Swap the element at min_idx with the element at index i.',
      'Advance the sorted boundary by 1 and repeat for n - 1 passes until the entire array is sorted.',
    ],
    example: {
      initialArray: '[5, 3, 8, 1]',
      steps: [
        {
          title: 'Pass 1 (i = 0)',
          desc: 'Search unsorted [5, 3, 8, 1]. Minimum element is 1 (index 3). Swap arr[0] (5) with arr[3] (1).',
          arrayState: '[1, 3, 8, 5] (Sorted prefix: [1])',
        },
        {
          title: 'Pass 2 (i = 1)',
          desc: 'Search unsorted [3, 8, 5]. Minimum element is 3 (index 1). Already in place, no swap needed.',
          arrayState: '[1, 3, 8, 5] (Sorted prefix: [1, 3])',
        },
        {
          title: 'Pass 3 (i = 2)',
          desc: 'Search unsorted [8, 5]. Minimum element is 5 (index 3). Swap arr[2] (8) with arr[3] (5).',
          arrayState: '[1, 3, 5, 8] (Sorted prefix: [1, 3, 5, 8])',
        },
      ],
      finalResult: '[1, 3, 5, 8]',
    },
    pythonCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap minimum element into current position
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Test
print(selection_sort([5, 3, 8, 1]))  # Output: [1, 3, 5, 8]`,
    timeComplexity: {
      best: 'O(n²)',
      bestNote: 'Always scans the full remaining unsorted subarray',
      average: 'O(n²)',
      worst: 'O(n²)',
      worstNote: 'Consistent comparisons regardless of initial array ordering',
    },
    spaceComplexity: {
      value: 'O(1)',
      explanation: 'In-place sorting requiring only a single scalar index variable (min_idx).',
    },
    stable: false,
    stabilityExplanation: 'No. Long-distance swaps can reorder identical elements (e.g., in [4a, 4b, 1], 4a swaps with 1 and ends up after 4b).',
    advantages: [
      'Performs minimum memory writes: at most n - 1 swaps, making it ideal when write operations are expensive (e.g. Flash memory).',
      'Simple logic with zero additional memory overhead.',
    ],
    disadvantages: [
      'Inefficient O(n²) time complexity across all cases, even when the input is already sorted.',
      'Unstable in standard array implementations.',
    ],
    examTip:
      'Remember: "Minimum swaps algorithm." While Bubble Sort can make up to O(n²) swaps, Selection Sort makes at most O(n) swaps (at most n - 1). Time complexity is always O(n²) in best, average, and worst!',
  },

  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    shortDesc: 'Grows a sorted prefix by inserting each new value into its correct slot.',
    definition:
      'Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array one item at a time. It takes each element from the unsorted portion and shifts larger elements to the right to insert it into its correct relative position within the sorted portion.',
    workingSteps: [
      'Assume the first element (arr[0]) is trivially sorted.',
      'Pick the next element key = arr[i] starting from index 1.',
      'Compare key with elements in the sorted portion from right to left (j = i - 1 down to 0).',
      'If arr[j] > key, shift arr[j] one position to the right (arr[j + 1] = arr[j]).',
      'Repeat shifting until finding an element <= key or reaching the start of the array, then place key at arr[j + 1].',
      'Repeat for all elements until the array is fully sorted.',
    ],
    example: {
      initialArray: '[5, 3, 8, 1]',
      steps: [
        {
          title: 'Pass 1 (key = 3, index 1)',
          desc: 'Compare with 5: 5 > 3 -> Shift 5 right -> [5, 5, 8, 1]. Insert 3 at index 0.',
          arrayState: '[3, 5, 8, 1] (Sorted prefix: [3, 5])',
        },
        {
          title: 'Pass 2 (key = 8, index 2)',
          desc: 'Compare with 5: 5 <= 8 -> No shift needed. 8 remains in place.',
          arrayState: '[3, 5, 8, 1] (Sorted prefix: [3, 5, 8])',
        },
        {
          title: 'Pass 3 (key = 1, index 3)',
          desc: 'Compare with 8 -> Shift 8. Compare with 5 -> Shift 5. Compare with 3 -> Shift 3. Insert 1 at index 0.',
          arrayState: '[1, 3, 5, 8] (Sorted prefix: [1, 3, 5, 8])',
        },
      ],
      finalResult: '[1, 3, 5, 8]',
    },
    pythonCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements greater than key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Test
print(insertion_sort([5, 3, 8, 1]))  # Output: [1, 3, 5, 8]`,
    timeComplexity: {
      best: 'O(n)',
      bestNote: 'When array is already sorted (only 1 comparison per element, 0 shifts)',
      average: 'O(n²)',
      worst: 'O(n²)',
      worstNote: 'When array is sorted in reverse order',
    },
    spaceComplexity: {
      value: 'O(1)',
      explanation: 'In-place sorting algorithm requiring only a single scalar key variable.',
    },
    stable: true,
    stabilityExplanation: 'Yes. Elements only shift when strictly greater than key (arr[j] > key), preserving the original order of duplicate values.',
    advantages: [
      'Very fast for small arrays (often faster than QuickSort/MergeSort for n <= 16) and nearly sorted data.',
      'Online algorithm: can sort streaming data as it arrives in real-time.',
      'Stable and in-place with O(1) auxiliary space.',
    ],
    disadvantages: [
      'Quadratic O(n²) time complexity makes it unsuitable for large unsorted datasets.',
      'Involves multiple element shifts for elements that need to travel far.',
    ],
    examTip:
      'Remember: "Playing Cards Analogy." Think of arranging playing cards in your hand by sliding each card into its correct position. Best-case time is linear O(n) when already sorted!',
  },

  merge: {
    id: 'merge',
    name: 'Merge Sort',
    shortDesc: 'Divides the array in half, recursively sorts both, and merges them back in order.',
    definition:
      'Merge Sort is an efficient, general-purpose, comparison-based sorting algorithm based on the Divide and Conquer paradigm. It recursively divides the input array into two equal halves until single-element subarrays remain, then merges the sorted halves back together in order.',
    workingSteps: [
      'Divide: Find the midpoint mid = len(arr) // 2 and split the array into two halves (left and right).',
      'Conquer: Recursively call merge_sort on the left and right halves until subarrays of size <= 1 are reached (base case: trivially sorted).',
      'Combine (Merge): Compare the smallest available elements of left and right subarrays, appending the smaller value to the merged output.',
      'Copy Remainder: Once one subarray is exhausted, append all remaining elements from the other subarray.',
      'Return the merged, fully sorted array to the caller.',
    ],
    example: {
      initialArray: '[5, 3, 8, 1]',
      steps: [
        {
          title: 'Divide Phase',
          desc: 'Split [5, 3, 8, 1] into [5, 3] and [8, 1]. Further split into single elements [5], [3], [8], [1].',
          arrayState: 'Subarrays: [5], [3] | [8], [1]',
        },
        {
          title: 'Merge Phase 1',
          desc: 'Merge [5] and [3] -> [3, 5]. Merge [8] and [1] -> [1, 8].',
          arrayState: 'Two sorted halves: [3, 5] and [1, 8]',
        },
        {
          title: 'Merge Phase 2',
          desc: 'Merge [3, 5] and [1, 8]: Compare 3 vs 1 -> take 1; compare 3 vs 8 -> take 3; compare 5 vs 8 -> take 5; append remaining 8.',
          arrayState: '[1, 3, 5, 8] (Final merged array)',
        },
      ],
      finalResult: '[1, 3, 5, 8]',
    },
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # Merge the two sorted halves
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
            
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

# Test
print(merge_sort([5, 3, 8, 1]))  # Output: [1, 3, 5, 8]`,
    timeComplexity: {
      best: 'O(n log n)',
      bestNote: 'Guaranteed log n division levels with O(n) work per level',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      worstNote: 'Consistent O(n log n) runtime regardless of input arrangement',
    },
    spaceComplexity: {
      value: 'O(n)',
      explanation: 'Requires auxiliary array memory proportional to input size during the merge step.',
    },
    stable: true,
    stabilityExplanation: 'Yes. When left[i] <= right[j], picking left[i] first preserves the initial relative order of equal values.',
    advantages: [
      'Guaranteed O(n log n) time complexity in all cases (Best, Average, and Worst).',
      'Stable sorting algorithm, making it ideal for composite keys and linked lists.',
      'Well-suited for external sorting when datasets are too large to fit in RAM.',
    ],
    disadvantages: [
      'Requires O(n) additional memory space for auxiliary arrays.',
      'Slower than QuickSort on small in-memory arrays due to memory copying overhead.',
    ],
    examTip:
      'Remember: "Recurrence Relation: T(n) = 2T(n/2) + O(n)." By Master Theorem Case 2, this evaluates to O(n log n) in ALL cases (Best, Average, and Worst). Stable but requires O(n) auxiliary space!',
  },

  quick: {
    id: 'quick',
    name: 'Quick Sort',
    shortDesc: 'Partitions around a pivot so smaller values go left and larger values go right.',
    definition:
      'Quick Sort is a highly efficient Divide-and-Conquer sorting algorithm that selects an element as a "pivot" and partitions the array around it. Elements smaller than the pivot are placed to its left and elements greater to its right, followed by recursively sorting the subarrays.',
    workingSteps: [
      'Choose Pivot: Select a pivot element from the array (commonly the last element, first element, or middle element).',
      'Partitioning: Rearrange elements such that all values smaller than or equal to the pivot move to the left, and all values greater move to the right.',
      'Place Pivot: The pivot is placed at its finalized sorted position between the two partitions.',
      'Divide & Conquer: Recursively apply quick_sort to the left subarray (elements < pivot) and the right subarray (elements > pivot).',
      'Base Case: Subarrays of length 0 or 1 are already sorted; terminate recursion.',
    ],
    example: {
      initialArray: '[5, 3, 8, 1]',
      steps: [
        {
          title: 'Step 1: Partition around pivot = 1',
          desc: 'Array [5, 3, 8, 1] with pivot = 1. No elements are smaller than 1. Place 1 at index 0.',
          arrayState: '[1, 3, 8, 5] (Pivot 1 is fixed; left subarray: [], right subarray: [3, 8, 5])',
        },
        {
          title: 'Step 2: Partition right subarray [3, 8, 5] around pivot = 5',
          desc: 'Pivot = 5. Elements <= 5: [3]. Elements > 5: [8]. Place 5 between 3 and 8.',
          arrayState: '[3, 5, 8] (Pivot 5 is fixed; left: [3], right: [8])',
        },
        {
          title: 'Step 3: Base cases',
          desc: 'Subarrays [3] and [8] contain 1 element each (already sorted). Combine left + pivot + right.',
          arrayState: '[1, 3, 5, 8] (Fully sorted array)',
        },
      ],
      finalResult: '[1, 3, 5, 8]',
    },
    pythonCode: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[-1]  # Choose last element as pivot
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    
    return quick_sort(left) + [pivot] + quick_sort(right)

# Test
print(quick_sort([5, 3, 8, 1]))  # Output: [1, 3, 5, 8]`,
    timeComplexity: {
      best: 'O(n log n)',
      bestNote: 'When pivot divides array into two roughly equal halves',
      average: 'O(n log n)',
      worst: 'O(n²)',
      worstNote: 'When array is already sorted/reversed and pivot is chosen as first or last element',
    },
    spaceComplexity: {
      value: 'O(log n)',
      explanation: 'Average call-stack depth is O(log n); worst-case call-stack depth is O(n) for unbalanced partitions.',
    },
    stable: false,
    stabilityExplanation: 'No. Partitioning swaps elements across the pivot over long distances, disrupting the relative order of identical elements.',
    advantages: [
      'Fastest general-purpose comparison sort in practice with excellent cache locality.',
      'Can be implemented in-place with minimal O(log n) call-stack space.',
      'Widely used in production standard libraries (e.g. C qsort, hybrid Timsort/Introsort).',
    ],
    disadvantages: [
      'Worst-case performance degrades to O(n²) on poorly chosen pivots (e.g., sorted arrays with naive pivot choice).',
      'Not a stable sorting algorithm.',
    ],
    examTip:
      'Remember: "Partitioning is the key." Quick Sort does all the hard work *before* recursive calls (partitioning), unlike Merge Sort which does the work *after* recursive calls (merging). Mention Lomuto or Hoare partitioning in theory exams!',
  },

  heap: {
    id: 'heap',
    name: 'Heap Sort',
    shortDesc: 'Builds a max-heap, then repeatedly moves the largest root value to the end.',
    definition:
      'Heap Sort is a comparison-based sorting algorithm based on a Binary Heap data structure. It first converts the array into a Max-Heap, then repeatedly extracts the maximum root element, moves it to the end of the array, and rebuilds the heap until all elements are sorted.',
    workingSteps: [
      'Build Max-Heap: Transform the input array of size n into a Max-Heap where every parent node is greater than or equal to its children (arr[parent] >= arr[children]). Heapify non-leaf nodes from n // 2 - 1 down to 0.',
      'Swap Root with Last: Swap the root element (arr[0], which holds the maximum) with the last element of the unsorted heap (arr[i]).',
      'Shrink Heap: Decrease active heap size by 1 (the extracted element is now finalized at the end).',
      'Heapify Root: Call heapify on index 0 to restore the Max-Heap property for the remaining heap elements.',
      'Repeat: Continue swapping and heapifying until the heap size reduces to 1. The array is now sorted in ascending order.',
    ],
    example: {
      initialArray: '[5, 3, 8, 1]',
      steps: [
        {
          title: 'Step 1: Build Max-Heap',
          desc: 'Array [5, 3, 8, 1]. Non-leaf nodes: index 1 (value 3, child 1 -> valid). Index 0 (value 5, children 3 and 8 -> 8 > 5, swap 5 and 8). Max-Heap formed: [8, 3, 5, 1].',
          arrayState: '[8, 3, 5, 1] (Max-Heap with root = 8)',
        },
        {
          title: 'Step 2: Extract 8',
          desc: 'Swap root 8 with last element 1 -> [1, 3, 5, 8]. Heapify root 1 over [1, 3, 5] -> swap 1 and 5 -> [5, 3, 1].',
          arrayState: '[5, 3, 1, 8] (Heap size = 3, 8 is sorted at end)',
        },
        {
          title: 'Step 3: Extract 5',
          desc: 'Swap root 5 with last heap element 1 -> [1, 3, 5, 8]. Heapify root 1 over [1, 3] -> swap 1 and 3 -> [3, 1].',
          arrayState: '[3, 1, 5, 8] (Heap size = 2, [5, 8] sorted)',
        },
        {
          title: 'Step 4: Extract 3',
          desc: 'Swap root 3 with 1 -> [1, 3, 5, 8]. Heap size = 1, sorting complete.',
          arrayState: '[1, 3, 5, 8] (Entire array sorted)',
        },
      ],
      finalResult: '[1, 3, 5, 8]',
    },
    pythonCode: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    # Step 1: Build Max-Heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
        
    # Step 2: Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move current root to end
        heapify(arr, i, 0)              # Restore heap on reduced array
    return arr

# Test
print(heap_sort([5, 3, 8, 1]))  # Output: [1, 3, 5, 8]`,
    timeComplexity: {
      best: 'O(n log n)',
      bestNote: 'Building heap is O(n); n extractions take O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      worstNote: 'Guaranteed O(n log n) in all cases without extra space',
    },
    spaceComplexity: {
      value: 'O(1)',
      explanation: 'In-place sorting algorithm requiring zero auxiliary arrays.',
    },
    stable: false,
    stabilityExplanation: 'No. Heap reorganization and root swaps change the relative order of duplicate elements.',
    advantages: [
      'Guaranteed O(n log n) worst-case time with in-place O(1) auxiliary space (unlike Merge Sort which requires O(n) space).',
      'Provides predictable performance for real-time and mission-critical systems.',
    ],
    disadvantages: [
      'Unstable sorting algorithm.',
      'Slower than QuickSort in practice because heap parent-child index jumps cause poor cache locality.',
    ],
    examTip:
      'Classic Exam Question: "Building the initial Max-Heap takes O(n) time, NOT O(n log n)!" The subsequent extraction phase takes O(n log n) time, giving a total runtime of O(n log n). Space is strictly O(1)!',
  },
};

export const ALGORITHM_EXAM_KEYS = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];
