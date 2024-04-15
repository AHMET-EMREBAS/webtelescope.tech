import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
const modules = [
  CommonModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatBadgeModule,
  RouterModule,
];

export class NavListItem {
  label!: string;
  id?: number;
  subLabel?: string;
  icon?: string;
  iconColor?: 'primary' | 'accent' | 'warn';
  badge?: string;
  badgeColor?: 'primary' | 'accent' | 'warn';
  route?: string;
}

@Component({
  selector: 'wt-nav-list',
  standalone: true,
  imports: [...modules],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
})
export class NavListComponent {
  activeItem = '';
  @Input() title?: string;
  @Input() listItems?: NavListItem[];
  @Output() clickEvent = new EventEmitter<NavListItem>();

  handleClickEvent(item: NavListItem) {
    this.activeItem = item.label;
    this.clickEvent.emit(item);
  }
}
