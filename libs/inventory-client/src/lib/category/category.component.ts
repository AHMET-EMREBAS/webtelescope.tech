import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ResourceService,
  provideSearchControl,
  provideTableColumns,
} from '@webpackages/components';
import { CategoryService } from './category.service';

@Component({
  selector: 'wt-category',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    provideTableColumns([
      { name: 'name', icon: 'info', label: 'Category Name' },
    ]),
    {
      provide: ResourceService,
      useClass: CategoryService,
    },
    provideSearchControl(),
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  constructor() {}
}
