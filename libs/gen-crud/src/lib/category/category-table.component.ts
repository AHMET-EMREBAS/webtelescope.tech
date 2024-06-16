/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterViewInit, Component } from '@angular/core';
import { BaseResourceTableComponent } from '@webpackages/client-common';
import { ICategory } from '@webpackages/gen-model';
import { TableComponent } from '@webpackages/material/table';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { categoryModelManager } from './category-model-manager';

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
  providers: [CategoryService],
})
export class CategoryTableComponent
  extends BaseResourceTableComponent<ICategory>
  implements AfterViewInit
{
  data: ICategory[] = [];
  entities$: Observable<ICategory[]> = this.service.entities$;

  columns = categoryModelManager.uiTablePropetiesList();
  count$: Observable<number> = this.service.allCount$;

  constructor(service: CategoryService) {
    super(service);
  }
}
