/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableItem } from './table-datasource';
import { CommonModule } from '@angular/common';
import { BaseNgrxDataService } from '../api';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'wt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @Input() dataService!: BaseNgrxDataService<any>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  @Input() columns!: string[];
  @Input() displayedColumns!: string[];

  count$!: Observable<number>;
  entities$!: Observable<any[]>;

  ngOnInit(): void {
    this.entities$ = this.dataService.entities$;
    this.count$ = this.dataService.meta$.pipe(map((e) => e.count));

  }
}
