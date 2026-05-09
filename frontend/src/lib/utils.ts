import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type DateFormatOptions = {
  day?: '2-digit' | 'numeric';
  month?: '2-digit' | 'numeric' | 'long' | 'short' | 'narrow';
  year?: '2-digit' | 'numeric';
  hour?: '2-digit' | 'numeric';
  minute?: '2-digit' | 'numeric';
  second?: '2-digit' | 'numeric';
};

export function formatDate(
  dateString: string,
  options: DateFormatOptions = {}
): string {
  const date = new Date(dateString);

  const {
    day = '2-digit',
    month = '2-digit',
    year = 'numeric',
    hour = '2-digit',
    minute = '2-digit',
  } = options;

  return new Intl.DateTimeFormat('pl-PL', {
    day,
    month,
    year,
    hour,
    minute,
  }).format(date);
}