import { AlgorithmId, PracticeQuestion } from '../types';
import { generateSteps } from '../algorithms';
import { ALGORITHMS } from '../algorithms/definitions';

// Utility to shuffle an array
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generatePracticeQuestions(
  algorithmId: AlgorithmId,
  overrideList?: number[]
): { list: number[]; questions: PracticeQuestion[] } {
  // Generate a random array of 5 or 6 numbers (with potential duplicates)
  let list = overrideList;
  if (!list) {
    const pool = [9, 15, 16, 21, 21, 28, 5, 12, 18, 30, 7, 24];
    const picked: number[] = [];
    for (let i = 0; i < 6; i++) {
      picked.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    list = picked;
  }

  const steps = generateSteps(algorithmId, list);
  const finalSortedArray = [...list].sort((a, b) => a - b);
  const algoName = ALGORITHMS[algorithmId].name;

  // Question 1: Fully sorted result
  const correctQ1 = finalSortedArray.join(', ');
  // Distractors
  const reverseSorted = [...finalSortedArray].reverse().join(', ');
  const partial1 = (() => {
    const copy = [...finalSortedArray];
    if (copy.length >= 3) {
      [copy[0], copy[1]] = [copy[1], copy[0]];
    }
    return copy.join(', ');
  })();
  const partial2 = (() => {
    const copy = [...list];
    // Slightly altered
    if (copy.length >= 2) {
      copy[0] = copy[0] + 1;
    }
    return copy.join(', ');
  })();

  const rawOptions1 = [
    { text: correctQ1, isCorrect: true },
    { text: reverseSorted, isCorrect: false },
    { text: partial1, isCorrect: false },
    { text: partial2, isCorrect: false },
  ];
  // Deduplicate and ensure 3-4 options
  const uniqueTexts1 = new Set<string>();
  const filteredOpts1 = rawOptions1.filter((opt) => {
    if (uniqueTexts1.has(opt.text)) return false;
    uniqueTexts1.add(opt.text);
    return true;
  });
  const q1Options = shuffleArray(filteredOpts1).map((opt, idx) => ({
    id: `q1-opt-${idx}`,
    text: opt.text,
    isCorrect: opt.isCorrect,
  }));

  // Question 2: Intermediate state at the moment the first value is locked in place
  // Find the step where sorted.length === 1 or first locked item
  const firstLockStep = steps.find((s) => s.sorted.length >= 1) || steps[Math.floor(steps.length / 2)] || steps[0];
  const correctQ2 = firstLockStep.array.join(', ');

  const distractor2a = finalSortedArray.join(', ');
  const distractor2b = list.join(', ');
  const distractor2c = (() => {
    const copy = [...firstLockStep.array];
    if (copy.length >= 4) {
      [copy[copy.length - 2], copy[copy.length - 1]] = [copy[copy.length - 1], copy[copy.length - 2]];
    }
    return copy.join(', ');
  })();

  const rawOptions2 = [
    { text: correctQ2, isCorrect: true },
    { text: distractor2a === correctQ2 ? [...list].reverse().join(', ') : distractor2a, isCorrect: false },
    { text: distractor2b === correctQ2 ? [...firstLockStep.array].reverse().join(', ') : distractor2b, isCorrect: false },
    { text: distractor2c === correctQ2 ? `${firstLockStep.array[0]}, ${finalSortedArray.join(', ')}` : distractor2c, isCorrect: false },
  ];
  const uniqueTexts2 = new Set<string>();
  const filteredOpts2 = rawOptions2.filter((opt) => {
    if (uniqueTexts2.has(opt.text)) return false;
    uniqueTexts2.add(opt.text);
    return true;
  });
  const q2Options = shuffleArray(filteredOpts2).map((opt, idx) => ({
    id: `q2-opt-${idx}`,
    text: opt.text,
    isCorrect: opt.isCorrect,
  }));

  // Question 3: Total swaps or writes
  const totalWrites = steps[steps.length - 1]?.writes ?? 0;
  const distractor3a = Math.max(0, totalWrites + 3);
  const distractor3b = Math.max(1, totalWrites - 2);
  const distractor3c = totalWrites + 6;

  const rawOptions3 = [
    { text: String(totalWrites), isCorrect: true },
    { text: String(distractor3a), isCorrect: false },
    { text: String(distractor3b), isCorrect: false },
    { text: String(distractor3c), isCorrect: false },
  ];
  const uniqueTexts3 = new Set<string>();
  const filteredOpts3 = rawOptions3.filter((opt) => {
    if (uniqueTexts3.has(opt.text)) return false;
    uniqueTexts3.add(opt.text);
    return true;
  });
  const q3Options = shuffleArray(filteredOpts3).map((opt, idx) => ({
    id: `q3-opt-${idx}`,
    text: opt.text,
    isCorrect: opt.isCorrect,
  }));

  const questions: PracticeQuestion[] = [
    {
      id: 1,
      title: `Starting from [${list.join(', ')}], what is the fully sorted result?`,
      options: q1Options,
      correctOptionId: q1Options.find((o) => o.isCorrect)!.id,
      hint: `Sorting always orders elements in non-decreasing order from lowest to highest. Check if duplicates are preserved!`,
      explanation: `The fully sorted result in non-decreasing order is [${correctQ1}].`,
      isAnswered: false,
    },
    {
      id: 2,
      title: `Using ${algoName}, what does the list look like at the moment the first value is locked in place?`,
      options: q2Options,
      correctOptionId: q2Options.find((o) => o.isCorrect)!.id,
      hint: `${algoName} locks an element into place after completing its first partition or pass. Think about which end or position is finalized first!`,
      explanation: `After the first phase, the state is [${correctQ2}].`,
      isAnswered: false,
    },
    {
      id: 3,
      title: `How many swaps or value moves does ${algoName} make on this list in total?`,
      options: q3Options,
      correctOptionId: q3Options.find((o) => o.isCorrect)!.id,
      hint: `Count each time an element is moved or swapped into a new array position during the algorithm run.`,
      explanation: `${algoName} executes exactly ${totalWrites} swaps/moves on this sequence.`,
      isAnswered: false,
    },
  ];

  return { list, questions };
}
