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
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly MM = Messages;

  leftNavList: MenuItem[] = [
    {
      title: Messages.HOME,
      icon: 'home',
      route: '',
    },

    {
      title: 'Categories',
      icon: 'table_bar',
      route: 'categories',
    },
    {
      title: 'New Category',
      icon: 'create',
      route: 'category',
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
