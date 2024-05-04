import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IPaginatorDto } from '@webpackages/common';
import { InputOptions } from '@webpackages/meta';
import { MatSort, Sort } from '@angular/material/sort';
export type SearchEventPayload = {
  paginator: IPaginatorDto;
  query: Record<string, string>;
};

@Component({ template: '' })
export class BaseTableComponent<T> implements OnInit {
  @Input() displayedColumns: InputOptions[] = [];
  columns: string[] = [];

  @Input() data!: T[] | null;

  searchControl = new FormControl<string>('');

  @Output() searchEvent = new EventEmitter<SearchEventPayload>();
  @Input() count: number | null = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 5;
  @Input() pageOptions = [5, 10, 25, 100];

  orderBy = 'id';
  orderDir = 'asc';

  ngOnInit(): void {
    this.columns = this.displayedColumns.map((e) => e.name) as string[];
  }

  search() {
    this.searchEvent.emit({
      paginator: {
        take: this.pageSize,
        skip: this.pageIndex * this.pageSize,

        order: `${this.orderBy}:${this.orderDir}`,
      },
      query: this.searchControl.value
        ? this.displayedColumns

            .map((e) => {
              return { [e.name!]: this.searchControl.value! };
            })
            .reduce((p, c) => ({ ...p, ...c }))
        : {},
    });
  }

  sortTable(event: Sort) {
    this.orderBy = event.active;
    this.orderDir = event.direction;
    this.search();
  }

  createPaginator() {
    return {
      take: this.pageSize,
      skip: this.pageSize * this.pageIndex,
    };
  }

  createQueryObject(): Record<string, string> {
    return this.columns
      .map((e) => {
        return { [e]: this.searchControl.value } as { [key: string]: string };
      })
      .reduce((p, c) => ({ ...p, ...c }));
  }

  hasNextPage() {
    return (this.pageIndex + 1) * this.pageSize < (this.count ?? 1);
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.pageIndex++;

      this.search();
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;

      this.search();
    }
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;

    this.search();
  }
}
