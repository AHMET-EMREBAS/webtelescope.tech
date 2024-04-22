import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommon } from './common/';
import { WebLayoutModule } from '@webpackages/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [RouterModule, WebLayoutModule, MatButtonModule, MatIconModule],
  selector: 'wt-root',
  template: `
    <wt-web-layout>
      <ng-template wtToolbarLeft>
        <img wtAppLogo />
      </ng-template>

      <ng-template wtToolbarRight>
        <button mat-icon-button> <mat-icon>link</mat-icon> </button>
      </ng-template>

      <ng-template wtMainContent>
        <router-outlet></router-outlet>
      </ng-template>
    </wt-web-layout>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent extends AppCommon {}
