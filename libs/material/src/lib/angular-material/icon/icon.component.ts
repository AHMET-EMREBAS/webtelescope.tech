import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Color, Icon, IconVariant } from '../../common';

@Component({
  selector: 'wt-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() icon?: Icon;
  @Input() color?: Color;
  @Input() variant?: IconVariant;
}
