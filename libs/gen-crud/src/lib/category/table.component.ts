/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { BaseResourceTableComponent } from '@webpackages/client-common';
import { ICategory } from '@webpackages/gen-model';
import { TableComponent } from '@webpackages/material/table';
import { CategoryService } from './ngrx.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { categoryModelManager } from './model-manager';

@Component({
  selector: 'wt-category-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <wt-table
      [displayedColumns]="columns"
      [data]="data"
      [count]="count$ | async"
      (searchEvent)="search($event)"
    ></wt-table>
  `,
})
export class CategoryTableComponent
  extends BaseResourceTableComponent<ICategory>
  implements AfterViewInit
{
  data: ICategory[] = [];
  entities$: Observable<ICategory[]> = this.service.entities$;

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

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    let i = 0;
    ' '
      .repeat(100)
      .split('')
      .forEach((e) => {
        this.service.createEntity({ name: ` some ${i++}` });
      });

    this.entities$.subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }
}
