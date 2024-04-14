import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatBadgeModule } from '@angular/material/badge';
import {
  FloatingDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusBarDirective,
  StatusBarRightDirective,
  ToolbarDirective,
  ToolbarRightDirective,
} from './directives';
import { NgModule } from '@angular/core';

const directives = [
  FloatingDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusBarDirective,
  StatusBarRightDirective,
  ToolbarDirective,
  ToolbarRightDirective,
];

const modules = [
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBadgeModule,
];

@NgModule({
  imports: [...modules, ...directives],
  exports: [...modules, ...directives],
})
export class NavigationModule {}
