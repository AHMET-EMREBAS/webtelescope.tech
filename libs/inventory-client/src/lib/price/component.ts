/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nx/enforce-module-boundaries */
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

/* eslint-disable @nx/enforce-module-boundaries */
import { ResourceService } from '@webpackages/components';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Injectable } from '@angular/core';

export interface Price {
  name?: string;
  age?: number;
}

@Injectable({ providedIn: 'root' })
export class PriceService extends ResourceService<Price> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Price', factory);
  }
}

@Component({
  selector: 'wt-price',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: '<router-outlet></router-outlet>',
  providers: [
    provideTableColumns([
      { name: 'name', icon: 'info', label: 'Price Name' },
      { name: 'description', icon: 'description', label: 'Description' },
      {
        name: 'categories',
        icon: 'category',
        label: 'Category',
        mapFrom: (value) => {
          return value && value.map && value.map((e: any) => e.name);
        },
      },
    ]),
    provideSearchControl(),
  ],
})
export class PriceComponent {
  constructor() {}
}
