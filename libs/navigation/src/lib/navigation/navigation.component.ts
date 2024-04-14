import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime, map } from 'rxjs';
@Component({ template: '' })
export abstract class NavigationComponent {
  @Input() notificationBadge = '';
  @Input() profileBadge = '';
  @Input() settingBadge = '';

  readonly $isHandset = this.breakPointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      debounceTime(200),
      map((e) => {
        return e.matches;
      })
    );

  constructor(protected readonly breakPointObserver: BreakpointObserver) {}
}
