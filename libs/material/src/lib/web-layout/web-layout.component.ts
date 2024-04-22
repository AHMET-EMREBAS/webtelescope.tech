import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  BaseLayoutComponent,
  FloatingContainerComponent,
  FullscreenDirective,
  LayoutDirectives,
  TemplateOutletComponent,
  ViewportDirective,
} from '../common';

@Component({
  selector: 'wt-web-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    TemplateOutletComponent,
    FloatingContainerComponent,
    ViewportDirective,
    FullscreenDirective,
    ...LayoutDirectives,
  ],
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.scss',
  providers: [...LayoutDirectives],
})
export class WebLayoutComponent extends BaseLayoutComponent {
  @Input() testing = true;
}
