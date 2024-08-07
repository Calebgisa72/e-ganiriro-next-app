import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict, formatDate } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeDate(createdAt: Date) {
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
