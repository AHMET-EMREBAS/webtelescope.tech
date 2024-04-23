import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from '../web-layout/web-layout.component';

@Component({
  selector: 'wt-web-sample',
  standalone: true,
  imports: [CommonModule, WebLayoutComponent],
  templateUrl: './web-sample.component.html',
  styleUrl: './web-sample.component.scss',
})
export class WebSampleComponent {}
