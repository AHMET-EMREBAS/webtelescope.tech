import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AppLogoDirective,
  BaseLayoutComponent,
  FloatingContainerComponent,
  FullscreenDirective,
  LayoutDirectives,
  TemplateOutletComponent,
  ViewportDirective,
} from '../common';

export const __WebLayoutModules = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  TemplateOutletComponent,
  FloatingContainerComponent,
  MatButtonModule,
  MatIconModule,
  ViewportDirective,
  FullscreenDirective,
  ...LayoutDirectives,
];

@Component({
  selector: 'wt-web-layout',
  standalone: true,
  imports: [...__WebLayoutModules],
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.scss',
})
export class WebLayoutComponent extends BaseLayoutComponent {
  @Input() testing = false;
}

@NgModule({
  imports: [
    WebLayoutComponent,
    ...LayoutDirectives,
    AppLogoDirective,
    ViewportDirective,
    FullscreenDirective,
  ],
  exports: [
    WebLayoutComponent,
    ...LayoutDirectives,
    AppLogoDirective,
    ViewportDirective,
    FullscreenDirective,
  ],
})
export class WebLayoutModule {}
