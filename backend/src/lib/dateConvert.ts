import type { DateString, DateTimeString } from '@/types/date.js';

export const dateStringToDate = (dateString: DateString): Date => {
  return new Date(`${dateString}T00:00:00.000Z`);
};

export const dateToDateString = (date: Date): DateString => {
  return date.toISOString().slice(0, 10) as DateString;
};

export const dateToDateTimeString = (date: Date): DateTimeString => {
  return date.toISOString() as DateTimeString;
};
