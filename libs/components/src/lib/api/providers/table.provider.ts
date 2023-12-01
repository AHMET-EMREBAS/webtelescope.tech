/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from '@angular/core';
import { FormControl } from '@angular/forms';

export const TABLE_COLUMNS_TOKEN = 'TABLE_COLUMNS_TOKEN';

export type TableColumn = {
  name: string;
  label?: string;
  icon?: string;
  /**
   * Get column value from item
   * @param value
   * @returns
   */
  mapFrom?: (value: any) => any;
};

export function provideTableColumns(tableColumns: TableColumn[]): Provider {
  return {
    provide: TABLE_COLUMNS_TOKEN,
    useValue: tableColumns,
  };
}

export const SEARCH_CONTROL_TOKEN = 'SEARCH_CONTROL_TOKEN';

export function provideSearchControl(): Provider {
  return {
    provide: SEARCH_CONTROL_TOKEN,
    useValue: new FormControl(''),
  };
}
