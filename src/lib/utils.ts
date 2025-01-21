import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict, formatDate } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(createdAt: Date | string) {
  createdAt = new Date(createdAt);
  const currentDate = new Date();
  if (currentDate.getTime() - createdAt.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(createdAt, { addSuffix: true });
  } else {
    if (currentDate.getFullYear() === createdAt.getFullYear()) {
      return formatDate(new Date(createdAt), 'dd MMM');
    } else {
      return formatDate(new Date(createdAt), 'dd MMM, yyy');
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(n);
}
