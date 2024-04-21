import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDrawerMode,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MainContentDirective,
  FloatingItemsDirective,
  ToolbarRightDirective,
  ToolbarLeftDirective,
  SidenavLeftDirective,
  SidenavRightDirective,
  StatusbarLeftDirective,
  StatusbarRighttDirective,
} from './app-layout.directive';
import { ViewportDirective } from '../common/viewport/viewport.directive';
import { FullscreenDirective } from '../common/fullscreen/fullscreen.directive';
import { AppLogoDirective } from '../common/app-logo/app-logo.directive';
import { TemplateOutletComponent } from '../common/template-outlet/template-outlet.component';

const AppLayoutDirectives = [
  MainContentDirective,
  FloatingItemsDirective,
  ToolbarRightDirective,
  ToolbarLeftDirective,
  SidenavLeftDirective,
  SidenavRightDirective,
  StatusbarLeftDirective,
  StatusbarRighttDirective,
];

export const AppLayoutModules = [
  CommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  ViewportDirective,
  FullscreenDirective,
  AppLogoDirective,
  TemplateOutletComponent
];

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [...AppLayoutModules, ...AppLayoutDirectives],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
  providers: [...AppLayoutDirectives],
})
export class AppLayoutComponent {
  @ContentChildren(MainContentDirective)
  mainContent?: QueryList<MainContentDirective>;
  @ContentChildren(FloatingItemsDirective)
  floatingItems?: QueryList<FloatingItemsDirective>;
  @ContentChildren(ToolbarRightDirective)
  toolbarRight?: QueryList<ToolbarRightDirective>;
  @ContentChildren(ToolbarLeftDirective)
  toolbarLeft?: QueryList<ToolbarLeftDirective>;
  @ContentChildren(SidenavLeftDirective)
  sidenavLeft?: QueryList<SidenavLeftDirective>;
  @ContentChildren(SidenavRightDirective)
  sidenavRight?: QueryList<SidenavRightDirective>;
  @ContentChildren(StatusbarLeftDirective)
  statusbarLeft?: QueryList<StatusbarLeftDirective>;
  @ContentChildren(StatusbarRighttDirective)
  statusbarRightt?: QueryList<StatusbarRighttDirective>;

  /**
   * Test the app layout without pushing the content
   */
  @Input() testing = false;

  @Input() rightSidenavToggleIcon = 'settings';

  /**
   * @ignore internal
   */
  mode: MatDrawerMode = 'side';

  /**
   * @ignore internal
   */
  isLeftSidenavOpen = false;

  /**
   * @ignore internal
   */
  isRightSidenavOpen = false;

  /**
   * @ignore internal
   */
  sideNavClick(sidenav: MatSidenav, isHandset?: boolean) {
    if (isHandset) sidenav.toggle();
  }
}
