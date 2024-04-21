import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Direction = 'row' | 'column';
export type JustifyContent =
  | 'around'
  | 'between'
  | 'evenly'
  | 'start'
  | 'end'
  | 'center';
export type Gap = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';

@Component({
  selector: 'wt-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent {
  @Input() direction: Direction = 'column';
  @Input() justifyContent: JustifyContent = 'start';
  @Input() gap: Gap = 1;
}
