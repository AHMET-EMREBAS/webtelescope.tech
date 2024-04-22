import { Component } from '@angular/core';
import { AppCommon } from './common';
import { RouterModule } from '@angular/router';
import { WebLayoutModule } from '@webpackages/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [RouterModule, WebLayoutModule, MatButtonModule, MatIconModule],
  template: `
    <wt-web-layout>
      <ng-template wtToolbarLeft>
        <img wtAppLogo />
      </ng-template>

      <ng-template wtToolbarRight>
        <button mat-icon-button><mat-icon>link</mat-icon></button>
      </ng-template>

      <ng-template wtMainContent>
        <router-outlet></router-outlet>
      </ng-template>
    </wt-web-layout>
  `,
  standalone: true,
})
export class MainAppLayoutComponent extends AppCommon {}
