import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatBadgeModule } from '@angular/material/badge';
import {
  FloatingDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusBarDirective,
  StatusBarRightDirective,
  ToolbarDirective,
  ToolbarRightDirective,
} from './directives';

const directives = [
  FloatingDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusBarDirective,
  StatusBarRightDirective,
  ToolbarDirective,
  ToolbarRightDirective,
];

const modules = [
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBadgeModule,
];
@Component({
  selector: 'wt-nav',
  standalone: true,
  imports: [...modules, ...directives],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  @Input() notificationBadge = '';
  @Input() profileBadge = '';
  @Input() settingBadge = '';
  @Output() profileClickEvent = new EventEmitter();
  @Output() settingClickEvent = new EventEmitter();
  @Output() notificationClickEvent = new EventEmitter();

  emitProfileClickEvent() {
    this.profileClickEvent.emit();
  }
  emitSettingClickEvent() {
    this.settingClickEvent.emit();
  }
  emitNotificationClickEvent() {
    this.notificationClickEvent.emit();
  }
}
