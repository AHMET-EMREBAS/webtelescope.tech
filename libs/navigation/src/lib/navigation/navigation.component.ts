import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime, map } from 'rxjs';
@Component({ template: '' })
export abstract class NavigationComponent {
  /**
   * @internal Is dark mode
   */
  isDarkMode = false;

  /**
   * @internal Is the viewport handset
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
   * @internal Toggle darkmode
   */
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}
