import { keys } from './constants';

export function isAllowedKey(key: string): boolean {
  const isAllowed = keys.find((k) => k === key);
  return !!isAllowed;
}

export function getRandomColor(guess: {
  char: string;
  value: number;
  index: number;
}): string {
  const colors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
  return colors[Math.floor(Math.random() * colors.length)];
}
