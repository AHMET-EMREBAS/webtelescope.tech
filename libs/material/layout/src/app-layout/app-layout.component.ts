import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ViewportDirective,
  FullscreenDirective,
  AppLogoDirective,
  TemplateOutletComponent,
  BaseLayoutComponent,
  FloatingContainerComponent,
  LayoutDirectives,
} from '../common/';

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
  FloatingContainerComponent,
  MatBadgeModule,
  MatTooltipModule,
];

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [...AppLayoutModules, ...LayoutDirectives],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent extends BaseLayoutComponent {
  /**
   * Test the app layout without pushing the content
   */
  @Input() testing = false;

  @Input() rightSidenavToggleIcon = 'settings';
}

@NgModule({
  imports: [AppLayoutComponent, ...AppLayoutModules, ...LayoutDirectives],
  exports: [AppLayoutComponent, ...AppLayoutModules, ...LayoutDirectives],
})
export class AppLayoutModule {}
