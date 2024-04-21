import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewportDirective } from './viewport.directive';

@Component({
  selector: 'wt-viewport',
  standalone: true,
  imports: [CommonModule, ViewportDirective],
  templateUrl: './viewport.component.html',
  styleUrl: './viewport.component.scss',
})
export class ViewportComponent {}
