import { Component, Input, QueryList } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { TemplateOutletComponent } from '../template-outlet/template-outlet.component';
import { ITemplateRef } from '../types';
import { FullscreenDirective } from '../fullscreen/fullscreen.directive';

@Component({
  selector: 'wt-floating-container',
  standalone: true,
  imports: [CommonModule, TemplateOutletComponent, FullscreenDirective],
  templateUrl: './floating-container.component.html',
  styleUrl: './floating-container.component.scss',
})
export class FloatingContainerComponent {
  @Input() items?: QueryList<ITemplateRef<NgTemplateOutlet>>;
  @Input() testing = false;
}
