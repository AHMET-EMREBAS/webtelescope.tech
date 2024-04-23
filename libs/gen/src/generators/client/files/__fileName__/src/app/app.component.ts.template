import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Messages } from './common/';
import {
  AppLayoutModule,
  MenuItem,
  NavListComponent,
} from '@webpackages/material/layout';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [RouterModule, AppLayoutModule, NavListComponent],
  selector: 'wt-root',
  template: `
    <wt-app-layout
      rightSidenavToggleIcon="apps"
      [leftSidenavToggleLabel]="MM.TOGGLE_LEFT_SIDENAV"
      [rightSidenavToggleLabel]="MM.TOGGLE_RIGHT_SIDENAV"
    >
      <!-- Toobar Left -->
      <ng-template wtToolbarLeft>
        <h1 class="app-title pv-2">{{ title.getTitle() }}</h1>
      </ng-template>

      <!-- Toobar Right -->
      <ng-template wtToolbarRight>
        <button mat-icon-button></button>
      </ng-template>

      <!-- Sidenav Left -->
      <ng-template wtSidenavLeft>
        <wt-nav-list title="Main" [items]="leftNavList"></wt-nav-list>
      </ng-template>

      <!-- Sidenav Right -->
      <ng-template wtSidenavRight>
        <wt-nav-list
          [title]="MM.ADMINISTRATIVE"
          [items]="rightNavList"
        ></wt-nav-list>
      </ng-template>

      <!-- Statusbar Left -->
      <ng-template wtStatusbarLeft>
        <button mat-icon-button>
          <mat-icon>help</mat-icon>
        </button>
      </ng-template>

      <!-- Statusbar Right -->
      <ng-template wtStatusbarRight>
        <button mat-icon-button [ariaLabel]="MM.NOTIFICATIONS">
          <mat-icon>notifications</mat-icon>
        </button>
      </ng-template>

      <!-- Floating Items -->
      <ng-template wtFloatingItems>
        <button mat-fab [ariaLabel]="MM.CHAT_WITH_US">
          <mat-icon>chat</mat-icon>
        </button>
      </ng-template>

      <!-- Main Content -->
      <ng-template wtMainContent>
        <router-outlet></router-outlet>
      </ng-template>
    </wt-app-layout>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly MM = Messages;

  leftNavList: MenuItem[] = [
    {
      title: Messages.HOME,
      icon: 'home',
    },
  ];
  rightNavList: MenuItem[] = [
    {
      title: Messages.USERS,
      icon: 'groups',
    },
  ];

  constructor(public title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(Messages.GREETING);
  }
}
