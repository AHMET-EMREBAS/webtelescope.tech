import { NgModule } from '@angular/core';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import {
  FloatingPanelDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusbarLeftDirective,
  StatusbarRightDirective,
  ToolbarLeftDirective,
  ToolbarRightDirective,
} from './directives/template.directive';
import { NavListComponent } from './nav-list/nav-list.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

const directives = [
  FloatingPanelDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusbarLeftDirective,
  StatusbarRightDirective,
  ToolbarLeftDirective,
  ToolbarRightDirective,
];

const modules = [
  CommonModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatBadgeModule,
  MatToolbarModule,
  NavMenuComponent,
  NavListComponent,
  MatSidenavModule,
];

@NgModule({
  imports: [...modules, ...directives],
  exports: [...modules, ...directives],
})
export class NavigationModule {}
