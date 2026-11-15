import { z } from 'zod';
import type { DateString, DateTimeString } from '@/types/date.js';

export const dateSchema = z.iso.date().transform((value) => value as DateString);

export const dateTimeSchema = z.iso.datetime({ precision: 3 }).transform((value) => value as DateTimeString);
