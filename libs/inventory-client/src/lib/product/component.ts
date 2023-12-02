import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  provideSearchControl,
  provideTableColumns,
} from '@webpackages/components';

@Component({
  selector: 'wt-product',
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
      { name: 'name', icon: 'info', label: 'Product Name' },
      { name: 'description', icon: 'description', label: 'Description' },
      {
        name: 'categories',
        icon: 'category',
        label: 'Category',
        mapFrom: (value) => {
          console.log(value);
          return value && value.map && value.map((e: any) => e.name);
        },
      },
    ]),
    provideSearchControl(),
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class ProductComponent {
  constructor() {}
}
