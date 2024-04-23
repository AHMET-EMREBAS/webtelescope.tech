import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IToggleValue } from '../types';

@Directive({
  selector: '[wtViewport]',
  standalone: true,
  exportAs: 'wtViewport',
})
export class ViewportDirective implements IToggleValue, OnInit, OnDestroy {
  isHandset?: boolean;
  isNotHandset?: boolean;

  /**
   * @ignore internal
   */
  $isHandset: Observable<boolean> = this.media
    .observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((e) => {
        const result = e.matches;
        this.isHandset = result;
        this.isNotHandset = !this.isHandset;
        return result;
      })
    );

  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly media: BreakpointObserver
  ) {}

  viewportSubscription!: Subscription;

  ngOnInit(): void {
    this.viewportSubscription = this.$isHandset.subscribe();
  }

  ngOnDestroy(): void {
    this.viewportSubscription.unsubscribe();
  }

  toggle(actual: string, handset: string) {
    return this.isHandset ? handset : actual;
  }

  toggleValue<T>(actualValue: T, conditionalValue: T): T {
    if (this.isHandset) {
      if (typeof conditionalValue == 'function') {
        return conditionalValue();
      }
      return conditionalValue;
    }
    if (typeof actualValue === 'function') {
      return actualValue();
    }
    return actualValue;
  }
}
