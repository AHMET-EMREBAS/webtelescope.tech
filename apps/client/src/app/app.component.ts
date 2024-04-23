import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMessages } from './common/';
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
    <wt-app-layout>
      <ng-template wtToolbarLeft>
        <h1 class="pv-2">
          {{ title.getTitle() }}
        </h1>
      </ng-template>
      <ng-template wtToolbarRight>
        <button mat-icon-button></button>
      </ng-template>
      <ng-template wtSidenavLeft>
        <wt-nav-list title="Main" [items]="leftNavList"></wt-nav-list>
      </ng-template>
      <ng-template wtSidenavRight>
        <wt-nav-list
          [title]="MM.ADMINISTRATIVE"
          [items]="rightNavList"
        ></wt-nav-list>
      </ng-template>
      <ng-template wtStatusbarLeft>
        <button mat-icon-button>
          <mat-icon>help</mat-icon>
        </button>
      </ng-template>
      <ng-template wtStatusbarRight>
        <button mat-icon-button [ariaLabel]="MM.NOTIFICATIONS">
          <mat-icon>notifications</mat-icon>
        </button>
      </ng-template>
      <ng-template wtFloatingItems>
        <button mat-fab [ariaLabel]="MM.CHAT_WITH_US">
          <mat-icon>chat</mat-icon>
        </button>
      </ng-template>
      <ng-template wtMainContent>
        <div
          class="flex row end align-stretch "
          style="border: 3px solid red ; height: 500px; width:500px;  "
        >
          <div style="background-color: orange;">FIrst ROw</div>
          <div style="background-color: orange;">FIrst ROw</div>
          <div style="background-color: orange;" class="self-start">
            FIrst ROw
          </div>
          <div style="background-color: orange;">FIrst ROw</div>
          <div style="background-color: orange;">FIrst ROw</div>
          <div style="background-color: orange;" class="self-stretch">
            FIrst ROw
          </div>
        </div>
        <router-outlet></router-outlet>
      </ng-template>
    </wt-app-layout>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly MM = AppMessages;

  leftNavList: MenuItem[] = [
    {
      title: 'Home',
      icon: 'home',
    },
  ];
  rightNavList: MenuItem[] = [
    {
      title: 'Users',
      icon: 'groups',
    },
  ];

  constructor(public title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Hello, there!');
  }
}
