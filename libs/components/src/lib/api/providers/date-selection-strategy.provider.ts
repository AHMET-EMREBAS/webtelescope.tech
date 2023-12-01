/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Provider, Type } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDateRangeSelectionStrategy,
} from '@angular/material/datepicker';

export function provideDateRangeSelectionStrategy(
  strategy: Type<MatDateRangeSelectionStrategy<any>>
): Provider {
  return {
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: strategy,
  };
}

@Injectable({ providedIn: 'root' })
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this.__create(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this.__create(activeDate);
  }

  private __create(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -2);
      const end = this._dateAdapter.addCalendarDays(date, 2);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Injectable({ providedIn: 'root' })
export class WeekDaysStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this.__create(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this.__create(activeDate);
  }

  private __create(date: D | null): DateRange<D> {
    if (date) {
      const dayOfWeek = this._dateAdapter.getDayOfWeek(date);
      const start = this._dateAdapter.addCalendarDays(date, -dayOfWeek + 1);
      const end = this._dateAdapter.addCalendarDays(date, -dayOfWeek + 5);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

@Injectable({ providedIn: 'root' })
export class WeekEndsStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this.__create(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this.__create(activeDate);
  }

  private __create(date: D | null): DateRange<D> {
    if (date) {
      // 3 --> 0 6

      const dayOfWeek = this._dateAdapter.getDayOfWeek(date);

      // Set saturday
      let saturday = 0;

      if (dayOfWeek === 0) {
        saturday = -1;
      } else if (dayOfWeek === 6) {
        saturday = 0;
      } else {
        saturday = -dayOfWeek - 1;
      }

      const start = this._dateAdapter.addCalendarDays(date, saturday);
      const end = this._dateAdapter.addCalendarDays(date, saturday + 1);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
