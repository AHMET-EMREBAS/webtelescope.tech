import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BaseLayoutComponent, TemplateOutletComponent } from '../common';

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
  ],
  templateUrl: './web-layout.component.html',
  styleUrl: './web-layout.component.scss',
})
export class WebLayoutComponent extends BaseLayoutComponent {
  @Input() testing = true;
}
