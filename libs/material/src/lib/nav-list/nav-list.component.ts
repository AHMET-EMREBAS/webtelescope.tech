import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MenuItem } from '../common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wt-nav-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
})
export class NavListComponent {
  /**
   * The last clicked item's id is stored here
   */
  activeItem = 0;
  /**
   * Nav list title
   */
  @Input() title: string = 'List title';

  /**
   * Nav list items
   */
  @Input() items: MenuItem[] = [];

  /**
   * Emit the nav item meta data when it is clicked
   */
  @Output() clickEvent = new EventEmitter<MenuItem>();

  clickHandler(item: MenuItem) {
    this.activeItem = item.id;
    this.clickEvent.emit(item);
  }
}
