import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { IPaginatorDto } from '@webpackages/common';
import { InputOptions } from '@webpackages/meta';

export type SearchEventPayload = {
  paginator: IPaginatorDto;
  query: Record<string, string>;
};

@Component({ template: '' })
export class BaseTableComponent<T> implements AfterViewInit, OnInit {
  @Input() displayedColumns: InputOptions[] = [];
  columns: string[] = [];

  @Input() dataSource!: MatTableDataSource<T> | null;
  searchControl = new FormControl<string>('');

  @Output() searchEvent = new EventEmitter<SearchEventPayload>();
  @ViewChild(MatSort) sort!: MatSort;
  @Input() count: number | null = 0;

  @Input() pageIndex = 0;
  @Input() pageSize = 5;

  @Input() pageOptions = [5, 10, 25, 100];

  ngOnInit(): void {
    this.columns = this.displayedColumns.map((e) => e.name) as string[];
  }

  ngAfterViewInit() {
    this.dataSource!.sort = this.sort;
  }

  search() {
    this.searchEvent.emit({
      paginator: {
        take: this.pageSize,
        skip: this.pageIndex * this.pageSize,
      },
      query: this.displayedColumns
        .map((e) => {
          return { [e.name!]: this.searchControl.value! };
        })
        .reduce((p, c) => ({ ...p, ...c })),
    });
  }

  nextPage() {
    if (this.pageIndex * this.pageSize < (this.count ?? 1)) {
      this.pageIndex++;
    }
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      return;
    }
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
}
