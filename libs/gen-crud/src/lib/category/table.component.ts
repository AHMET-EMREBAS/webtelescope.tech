/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { BaseResourceTableComponent } from '@webpackages/client-common';
import { ICategory } from '@webpackages/gen-model';
import { TableComponent } from '@webpackages/material/table';
import { CategoryService } from './ngrx.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { categoryModelManager } from './model-manager';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'wt-category-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <wt-table
      [displayedColumns]="columns"
      [dataSource]="entities$ | async"
      [count]="count$ | async"
    ></wt-table>
  `,
})
export class CategoryTableComponent extends BaseResourceTableComponent<ICategory> {
  entities$: Observable<MatTableDataSource<ICategory>> =
    this.service.entities$.pipe(
      map((data) => {
        return new MatTableDataSource<ICategory>(data);
      })
    );
  columns = categoryModelManager.uiTablePropetiesList();
  count$: Observable<number> = this.service.allCount$.pipe(
    map((v) => {
      console.log('COUNT : ', v);
      return v ?? 100;
    })
  );

  constructor(service: CategoryService) {
    super(service);
  }
}
