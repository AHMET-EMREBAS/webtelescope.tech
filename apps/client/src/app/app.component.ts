import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { EmailComponent } from '@webpackages/material';
import { QueryOperator } from '@webpackages/model';
import { PermissionService } from '@webpackages/ngrx';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, EmailComponent],
  selector: 'wt-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  constructor(private readonly service: PermissionService) {}
  ngOnInit(): void {
    this.service.entities$.subscribe(console.log);

    setTimeout(() => {
      this.service.allCount$.subscribe((value) =>
        console.log('Count: ' + value)
      );
      this.service
        .query({
          select: ['id', 'permission'],
          order: { permission: 'ASC' },
          loadEagerRelations: false,
          take: 3,
          skip: 1,
          withDeleted: false,
          where: [
            {
              property: 'permission',
              operator: QueryOperator.contains,
              value: 'write',
            },
          ],
        })
        .subscribe(console.log);
    }, 2000);
  }
}
