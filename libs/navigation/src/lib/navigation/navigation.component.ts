import {
  Component,
  ContentChildren,
  QueryList,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, debounceTime, map } from 'rxjs';
import {
  FloatingPanelDirective,
  LeftPanelDirective,
  MainPanelDirective,
  RightPanelDirective,
  StatusbarLeftDirective,
  StatusbarRightDirective,
  ToolbarLeftDirective,
  ToolbarRightDirective,
} from './directives/template.directive';
import { MatSidenav } from '@angular/material/sidenav';
@Component({ template: '' })
export abstract class NavigationComponent {
  @ViewChild('sidenavLeft') sidenavLeft!: MatSidenav;
  @ViewChild('sidenavRight') sidenavRight!: MatSidenav;

  /**
   * Inject template into navigation layout
   * `<ng-template wtMainPanel> Content </ng-template>`
   */
  @ContentChildren(MainPanelDirective)
  wtMainPanel?: QueryList<MainPanelDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtLeftPanel> Content </ng-template>`
   */
  @ContentChildren(LeftPanelDirective)
  wtLeftPanel?: QueryList<LeftPanelDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtRightPanel> Content </ng-template>`
   */
  @ContentChildren(RightPanelDirective)
  wtRightPanel?: QueryList<RightPanelDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtToolbarLeft> Content </ng-template>`
   */
  @ContentChildren(ToolbarLeftDirective)
  wtToolbarLeft?: QueryList<ToolbarLeftDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtToolbarRight> Content </ng-template>`
   */
  @ContentChildren(ToolbarRightDirective)
  wtToolbarRight?: QueryList<ToolbarRightDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtStatusbarLeft> Content </ng-template>`
   */
  @ContentChildren(StatusbarLeftDirective)
  wtStatusbarLeft?: QueryList<StatusbarLeftDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtStatusbarRight> Content </ng-template>`
   */
  @ContentChildren(StatusbarRightDirective)
  wtStatusbarRight?: QueryList<StatusbarRightDirective>;
  /**
   * Inject template into navigation layout
   * `<ng-template wtFloating> Content </ng-template>`
   */
  @ContentChildren(FloatingPanelDirective)
  wtFloating?: QueryList<FloatingPanelDirective>;

  /**
   * Is dark mode
   */
  isDarkMode: boolean = false;

  /**
   * Is viewport matches handset layout size.
   */
  readonly $isHandset: Observable<boolean> = this.breakPointObserver
    .observe([Breakpoints.XSmall])
    .pipe(
      debounceTime(200),
      map((e) => {
        return e.matches;
      })
    );

  constructor(protected readonly breakPointObserver: BreakpointObserver) {}

  /**
   * Toggle darkmode
   */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  closeSidenavLeft() {
    this.sidenavLeft.close();
  }

  closeSidenavRight() {
    this.sidenavRight.close();
  }

  closeSidenavs() {
    this.closeSidenavLeft();
    this.closeSidenavRight();
  }
  toggleSidenavLeft() {
    this.sidenavLeft.toggle();
  }

  toggleSidenavRight() {
    this.sidenavRight.toggle();
  }
}
