/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, SortDirection } from '@angular/material/sort';
import { Observable, debounceTime, map, merge, tap } from 'rxjs';
import {
  LocalStoreService,
  QueryObject,
  ResourceService,
  SEARCH_CONTROL_TOKEN,
  TABLE_COLUMNS_TOKEN,
  TableColumn,
  delayObservable,
} from '../api';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { slideInRightOnEnterAnimation } from 'angular-animations';
import '@angular/localize/init';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule}  from '@angular/material/chips'
@Component({
  selector: 'wt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule
  ],
  animations: [
    slideInRightOnEnterAnimation({ anchor: 'enter', duration: 200 }),
  ],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) matPage!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  readonly entityName = this.service.entityName;
  readonly count$: Observable<number> = delayObservable(
    this.service.allCount$,
    1000
  );

  data: any[] = [];

  selection = new SelectionModel<any>(true, []);
  selectedItem?: any;

  readonly data$: Observable<any> = delayObservable(
    this.service.filteredEntities$,
    1000
  ).pipe(
    map((data) => {
      this.data = [];
      let i = 0;
      for (const d of data) {
        setTimeout(() => {
          this.data = [...this.data, d];
        }, i * 50);
        i++;
      }
    })
  );

  tableEvents$!: Observable<void>;

  columns!: string[];
  displayedColumns!: string[];
  visibleColumns!: TableColumn[];

  pageSize = this.lss.get<number>('pageSize') || 20;
  pageIndex = this.lss.get<number>('pageIndex') || 0;
  active = this.lss.get<string>('active') || 'id';
  direction: SortDirection = this.lss.get<SortDirection>('direction') || 'asc';

  constructor(
    private readonly service: ResourceService<any>,
    private readonly lss: LocalStoreService,
    @Inject(TABLE_COLUMNS_TOKEN)
    private readonly tableColumns: TableColumn[],
    @Inject(SEARCH_CONTROL_TOKEN)
    public readonly searchControl: FormControl,
    public readonly router: Router,
    public readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const commonColumns = ['select', 'id'];
    const dColumns = this.lss.get<TableColumn[]>('visibleColumns');
    this.columns = [...commonColumns, ...this.tableColumns.map((e) => e.name)];

    if (dColumns) {
      this.visibleColumns = [...dColumns];
      this.displayedColumns = this.visibleColumns.map((e) => e.name);
    } else {
      this.visibleColumns = [...this.tableColumns];
      this.displayedColumns = [...this.columns];
    }
  }

  ngAfterViewInit(): void {
    this.tableEvents$ = merge(
      this.matPage.page,
      this.matSort.sortChange,
      this.searchControl.valueChanges.pipe(
        tap((e) => {
          this.matPage.firstPage();
        })
      )
    ).pipe(
      debounceTime(600),
      tap((value) => {
        this.getAll();
      }),
      map((value: any) => {
        return value;
      })
    );

    this.getAll();
  }

  ngOnDestroy(): void {
    // Save page config
    const pageIndex = this.matPage.pageIndex;
    const pageSize = this.matPage.pageSize;
    this.lss.set('pageIndex', pageIndex);
    this.lss.set('pageSize', pageSize);

    // Save sort config
    const direction = this.matSort.direction;
    const active = this.matSort.active;
    this.lss.set('direction', direction);
    this.lss.set('active', active);
  }

  getAll() {
    this.service.queryItem(this.prepareQuery());
  }

  private prepareQuery(): QueryObject {
    return {
      take: this.matPage.pageSize,
      skip: this.matPage.pageIndex * this.matPage.pageSize,
      orderBy: this.matSort.active,
      orderDir: this.matSort.direction,
      search: this.searchControl.value || undefined,
      withDeleted: false,
    };
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    if (this.data) {
      this.selection.select(...this.data);
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  updateItem() {
    this.router.navigate(['update', this.selection.selected.shift().id], {
      relativeTo: this.route,
    });
  }

  deleteItem() {
    this.router.navigate(['delete', this.selection.selected.shift().id], {
      relativeTo: this.route,
    });
  }
}
