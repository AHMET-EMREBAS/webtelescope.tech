import { Component, ContentChildren, QueryList } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime, map } from 'rxjs';
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
@Component({ template: '' })
export abstract class NavigationComponent {
  /**
   * @description <ng-template wtMainPanel> Content </ng-template>
   */
  @ContentChildren(MainPanelDirective)
  wtMainPanel?: QueryList<MainPanelDirective>;
  /**
   * @description <ng-template wtLeftPanel> Content </ng-template>
   */
  @ContentChildren(LeftPanelDirective)
  wtLeftPanel?: QueryList<LeftPanelDirective>;
  /**
   * @description <ng-template wtRightPanel> Content </ng-template>
   */
  @ContentChildren(RightPanelDirective)
  wtRightPanel?: QueryList<RightPanelDirective>;
  /**
   * @description <ng-template wtToolbarLeft> Content </ng-template>
   */
  @ContentChildren(ToolbarLeftDirective)
  wtToolbarLeft?: QueryList<ToolbarLeftDirective>;
  /**
   * @description <ng-template wtToolbarRight> Content </ng-template>
   */
  @ContentChildren(ToolbarRightDirective)
  wtToolbarRight?: QueryList<ToolbarRightDirective>;
  /**
   * @description <ng-template wtStatusbarLeft> Content </ng-template>
   */
  @ContentChildren(StatusbarLeftDirective)
  wtStatusbarLeft?: QueryList<StatusbarLeftDirective>;
  /**
   * @description <ng-template wtStatusbarRight> Content </ng-template>
   */
  @ContentChildren(StatusbarRightDirective)
  wtStatusbarRight?: QueryList<StatusbarRightDirective>;
  /**
   * @description <ng-template wtFloating> Content </ng-template>
   */
  @ContentChildren(FloatingPanelDirective)
  wtFloating?: QueryList<FloatingPanelDirective>;

  /**
   * Is dark mode
   */
  isDarkMode = false;

  /**
   * Is the viewport handset
   */
  readonly $isHandset = this.breakPointObserver
    .observe([Breakpoints.XSmall])
    .pipe(
      debounceTime(200),
      map((e) => {
        return e.matches;
      })
    );

  constructor(protected readonly breakPointObserver: BreakpointObserver) {}

  /**
   * @description Toggle darkmode
   */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}
