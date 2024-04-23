import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MenuItem } from '../common/types';
import { RouterModule } from '@angular/router';
import { getActivatedItemName, setActivatedItemName } from '../common';

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
export class WtNavListComponent {
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
    setActivatedItemName(item.title);
    this.clickEvent.emit(item);
  }

  isActiveListItem(item: MenuItem) {
    return getActivatedItemName() == item.title;
  }
}
