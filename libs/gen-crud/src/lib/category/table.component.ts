import { Component } from '@angular/core';
import { BaseResourceTableComponent } from '@webpackages/client-common';
import { ICategory } from '@webpackages/gen-model';
import { TableComponent } from '@webpackages/material/table';
import { CategoryService } from './ngrx.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'wt-category-table',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <wt-table
      [displayedColumns]="columns"
      [data]="entities$ | async"
    ></wt-table>
  `,
  styles: [
    `
      :host {
        height: 100%;
      }
    `,
  ],
})
export class CategoryTableComponent extends BaseResourceTableComponent<ICategory> {
  columns = ['id', 'name', 'createdAt', 'updatedAt', 'deletedAt'];

  entities$: Observable<ICategory[]> = this.service.entities$;
  constructor(service: CategoryService) {
    super(service);

    for (let i = 1; i < 50; i++) {
      this.service.addOneToCache({ id: i, name: `some ${i}` } as any);
    }
  }
}
