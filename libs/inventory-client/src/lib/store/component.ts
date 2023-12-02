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

export interface Store {
  name?: string;
  age?: number;
}

@Injectable({ providedIn: 'root' })
export class StoreService extends ResourceService<Store> {
  constructor(factory: EntityCollectionServiceElementsFactory) {
    super('Store', factory);
  }
}

@Component({
  selector: 'wt-store',
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
      { name: 'name', icon: 'info', label: 'Store Name' },
      {
        name: 'priceLevel',
        icon: 'layers',
        label: 'Price Level',
        mapFrom: (value) => value && value.name,
      },
    ]),
    provideSearchControl(),
  ],
})
export class StoreComponent {
  constructor() {}
}
