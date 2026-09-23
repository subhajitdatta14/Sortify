export function generateRandomArray(
  size: number,
  minValue: number,
  maxValue: number
): number[] {
  const min = Math.min(minValue, maxValue);
  const max = Math.max(minValue, maxValue);
  const result: number[] = [];

  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(val);
  }

  return result;
}

export function parseCustomArray(
  input: string
): { success: true; array: number[] } | { success: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { success: false, error: 'Please enter at least one number.' };
  }

  const parts = trimmed.split(/[\s,]+/).filter(Boolean);
  if (parts.length < 2) {
    return { success: false, error: 'Please enter at least 2 numbers separated by commas or spaces.' };
  }
  if (parts.length > 40) {
    return { success: false, error: 'Maximum 40 numbers allowed for visualization.' };
  }

  const numbers: number[] = [];
  for (const part of parts) {
    const num = Number(part);
    if (isNaN(num)) {
      return { success: false, error: `Invalid number token: "${part}"` };
    }
    if (num < -999 || num > 9999) {
      return { success: false, error: 'Values should be between -999 and 9999.' };
    }
    numbers.push(Math.round(num));
  }

  return { success: true, array: numbers };
}
