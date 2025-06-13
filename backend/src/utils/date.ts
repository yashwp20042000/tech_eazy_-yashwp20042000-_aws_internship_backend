
import { DateRange, OptionalDateRange } from '../types';

export const validateDateRange = (range: OptionalDateRange): DateRange => {
  const now = new Date();
  const defaultStart = new Date(now.setDate(now.getDate() - 30));
  
  return {
    start: range.start || defaultStart,
    end: range.end || new Date()
  };
};

export const formatDateRange = (range: DateRange): string => {
  return `${range.start.toISOString().split('T')[0]} to ${range.end.toISOString().split('T')[0]}`;
};

export const isDateWithinRange = (date: Date, range: DateRange): boolean => {
  return date >= range.start && date <= range.end;
};
