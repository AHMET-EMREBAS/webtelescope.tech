import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ViewportDirective,
  FullscreenDirective,
  AppLogoDirective,
  TemplateOutletComponent,
  MainContentDirective,
  FloatingItemsDirective,
  ToolbarRightDirective,
  ToolbarLeftDirective,
  SidenavLeftDirective,
  SidenavRightDirective,
  StatusbarLeftDirective,
  StatusbarRightDirective,
  BaseLayoutComponent,
} from '../common/';

const AppLayoutDirectives = [
  MainContentDirective,
  FloatingItemsDirective,
  ToolbarRightDirective,
  ToolbarLeftDirective,
  SidenavLeftDirective,
  SidenavRightDirective,
  StatusbarLeftDirective,
  StatusbarRightDirective,
];

export const AppLayoutModules = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  ViewportDirective,
  FullscreenDirective,
  AppLogoDirective,
  TemplateOutletComponent,
];

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [...AppLayoutModules, ...AppLayoutDirectives],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  providers: [...AppLayoutDirectives],
})
export class AppLayoutComponent extends BaseLayoutComponent {
  /**
   * Test the app layout without pushing the content
   */
  @Input() testing = false;

  @Input() rightSidenavToggleIcon = 'settings';
}
