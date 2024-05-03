import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { IPaginatorDto } from '@webpackages/common';

export type SearchEventPayload = {
  paginator: IPaginatorDto;
  query: Record<string, string>;
};

@Component({ template: '' })
export class BaseTableComponent<T> implements AfterViewInit {
  @Input() displayedColumns: string[] = ['id'];
  dataSource!: MatTableDataSource<T>;
  searchControl = new FormControl<string>('');
  @Output() searchEvent = new EventEmitter<SearchEventPayload>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() data: T[] | null = [];

  @Input() pageSize = 0;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.data ?? []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    this.searchEvent.emit({
      paginator: {
        take: this.paginator.pageSize,
        skip: this.paginator.pageIndex * this.paginator.pageSize,
      },
      query: this.displayedColumns
        .map((e) => {
          return { [e]: this.searchControl.value! };
        })
        .reduce((p, c) => ({ ...p, ...c })),
    });
  }
}
