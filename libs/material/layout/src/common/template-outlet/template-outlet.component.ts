import { Component, Input, QueryList } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

import { ITemplateRef } from '../types';

@Component({
  selector: 'wt-template-outlet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-outlet.component.html',
  styleUrl: './template-outlet.component.scss',
})
export class TemplateOutletComponent {
  @Input() testing = false;
  @Input() testName?: string;
  @Input() items?: QueryList<ITemplateRef<NgTemplateOutlet>>;
}
