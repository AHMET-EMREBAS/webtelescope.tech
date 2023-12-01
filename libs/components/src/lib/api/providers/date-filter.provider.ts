/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from '@angular/core';
import { DateFilterFn } from '@angular/material/datepicker';

export const DATE_PICKER_FILTER_STRATEGY = 'DATE_PICKER_FILTER_STRATEGY';

export function DisableWeekEndsStategy<D>(date: D): boolean {
  const day = (date as Date).getDay();
  return day !== 6 && day !== 0;
}

export function provideDatePickerFilter(
  dateFilter: DateFilterFn<any>
): Provider {
  return {
    provide: DATE_PICKER_FILTER_STRATEGY,
    useValue: dateFilter,
  };
}
