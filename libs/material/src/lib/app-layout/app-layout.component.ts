import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDrawerMode,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

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
  MatButtonToggleModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
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

  /**
   * @ignore internal
   */
  mode: MatDrawerMode = 'side';

  /**
   * @ignore internal
   */
  isLeftSidenavOpen = false;

  rightSidenavToggleIcon = 'settings';

  /**
   * @ignore internal
   */
  isRightSidenavOpen = false;

  /**
   * @ignore internal
   */
  isHandset = false;

  /**
   * @ignore internal
   */
  $isHandset: Observable<boolean> = this.media
    .observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((e) => {
        if (e.matches) {
          this.isHandset = true;
          this.mode = 'over';
          this.isLeftSidenavOpen = false;
          return true;
        } else {
          this.isHandset = false;
          this.mode = 'side';
          this.isLeftSidenavOpen = true;
          return false;
        }
      })
    );

  constructor(private readonly media: BreakpointObserver) {}

  /**
   * @ignore internal
   */
  sideNavClick(sidenav: MatSidenav) {
    if (this.isHandset) {
      sidenav.toggle();
    }
  }

  isFullscreen = false;
  fullscreenButtonIcon: 'fullscreen_exit' | 'fullscreen' = 'fullscreen';
  fullscreenTooltip: 'Fullscreen' | 'Exit Fullscreen' = 'Fullscreen';

  fullscreenToggle(element: HTMLDivElement) {
    this.isFullscreen = !this.isFullscreen;

    if (this.isFullscreen) {
      element.requestFullscreen();
      this.fullscreenTooltip = 'Exit Fullscreen';
      this.fullscreenButtonIcon = 'fullscreen_exit';
    } else {
      document.exitFullscreen();
      this.fullscreenTooltip = 'Fullscreen';
      this.fullscreenButtonIcon = 'fullscreen';
    }
  }
}
