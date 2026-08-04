import { rounds } from '../rounds.js';
import { quizCategories, quizQuestions } from '../questions.js';

export const BRAND_NAME = 'Challenge the Inspector';
export const QUIZ_REVIEWED = 'August 2026';

export const LEVELS = {
  homeowner: {
    id: 'homeowner',
    label: 'Homeowner',
    timeLimit: 30,
    radiusMultiplier: 1.15,
    description: 'More time and a slightly wider target area.',
  },
  siteManager: {
    id: 'siteManager',
    label: 'Site Manager',
    timeLimit: 20,
    radiusMultiplier: 1,
    description: 'The original challenge, balanced for speed and accuracy.',
  },
  inspector: {
    id: 'inspector',
    label: 'Inspector',
    timeLimit: 12,
    radiusMultiplier: 0.8,
    description: 'Less time and tighter accuracy. This is the hardest level.',
  },
};

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function seededShuffle(items, seedText) {
  let seed = 0;
  for (let index = 0; index < seedText.length; index += 1) {
    seed = ((seed << 5) - seed + seedText.charCodeAt(index)) | 0;
  }

  const random = () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function currentMonthlyChallenge() {
  const now = new Date();
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const label = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(now);
  return {
    key,
    label,
    rounds: seededShuffle(rounds, key).slice(0, Math.min(5, rounds.length)),
  };
}

export function createQuizSet(categoryId) {
  if (categoryId !== 'mixed') {
    return shuffle(quizQuestions.filter((question) => question.category === categoryId));
  }

  const guaranteed = quizCategories.flatMap((category) =>
    shuffle(quizQuestions.filter((question) => question.category === category.id)).slice(0, 2)
  );
  const guaranteedIds = new Set(guaranteed.map((question) => question.id));
  const extras = shuffle(quizQuestions.filter((question) => !guaranteedIds.has(question.id))).slice(0, 2);
  return shuffle([...guaranteed, ...extras]);
}

export function whyThisMatters(categoryId) {
  if (categoryId === 'nhqc') {
    return 'This helps distinguish normal handover tolerances from workmanship that may need correction.';
  }
  if (categoryId === 'nhbc') {
    return 'Correct movement detailing helps protect openings, finishes and weather tightness as materials move differently.';
  }
  if (categoryId === 'building-regulations') {
    return 'Correct gaps, seals and installation details help protect operation, air tightness, thermal performance and weather resistance.';
  }
  return 'Understanding the likely consequence helps a homeowner prioritise what should be corrected or investigated further.';
}
