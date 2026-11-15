import type { DateString, DateTimeString } from '@/types/date.js';

export type AppUser = {
  id: number
  email: string
  name: string
  address: string
  birthDate: DateString
  role: string
  createdAt: DateTimeString
};
