import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

const modules = [
  CommonModule,
  RouterModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
  MatTooltipModule,
];

export class MenuItem {
  label!: string;
  id?: number;
  icon?: string;
  iconColor?: 'primary' | 'accent' | 'warn';
  badge?: string;
  badgeColor?: 'primary' | 'accent' | 'warn';
  route?: string;
  subs?: MenuItem[];
}

@Component({
  selector: 'wt-nav-menu',
  standalone: true,
  imports: [...modules],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
})
export class NavMenuComponent {
  @Input() trigerIconColor?: string;
  @Input() trigerIcon?: string;
  @Input() trigerLabel?: string;
  @Input() menuItems?: MenuItem[];

  /**
   * @ignore internal input
   */
  @Input() isSubmenu = false;

  @Output() menuClickEvent = new EventEmitter<MenuItem>();

  handleClickEvent(event: MenuItem) {
    this.menuClickEvent.emit(event);
  }
}
