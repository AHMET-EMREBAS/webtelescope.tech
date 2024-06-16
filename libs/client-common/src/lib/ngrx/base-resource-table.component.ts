import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BaseTableComponent, SearchEventPayload } from './base-table.component';
import { NgrxCollectionService } from './ngrx-collection-service';

@Component({ template: '' })
export class BaseResourceTableComponent<T> implements AfterViewInit {
  @ViewChild('table') table!: BaseTableComponent<T>;

  constructor(protected readonly service: NgrxCollectionService<T>) {}

  search(query: SearchEventPayload) {
    this.service.queryEntity(query.paginator, query.query);
  }

  ngAfterViewInit(): void {
    this.service.getAll();
  }
}
