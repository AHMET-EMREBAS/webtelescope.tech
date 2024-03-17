import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { IBaseEntity } from '@webpackages/common';

export interface Sample extends IBaseEntity {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class SampleService extends EntityCollectionServiceBase<Sample> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Sample', serviceElementsFactory);
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'wt-root',
  template: `<router-outlet></router-outlet>`,
  providers: [SampleService],
})
export class AppComponent implements OnInit {
  constructor(private readonly service: SampleService) {}
  ngOnInit(): void {
    this.service.entities$.subscribe(console.log);
    this.service.getWithQuery({
      take: 20,
      where: ['name:eq:value', 'id:eq:1'],
    });
    this.service.getAll().subscribe(console.log);
  }
}
