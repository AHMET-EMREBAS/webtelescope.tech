import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IToggleValue } from '../types';

/**
 * Access the view port inforamtion utilizing this useful directive in your template
 *
 * ````html
 * <container-element #viewport="wtViewport" wtViewport>
 *    <h1> {{ viewport.toggleValue() }} </h1>
 * </container-element>
 * ````
 */
@Directive({
  selector: '[wtViewport]',
  standalone: true,
  exportAs: 'wtViewport',
})
export class ViewportDirective implements IToggleValue, OnInit, OnDestroy {
  private __isHandset?: boolean;
  private __isNotHandset?: boolean;
  viewportSubscription!: Subscription;

  /**
   * @ignore internal
   */
  $isHandset: Observable<boolean> = this.media
    .observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map((e) => {
        const result = e.matches;
        this.__isHandset = result;
        this.__isNotHandset = !this.__isHandset;
        return result;
      })
    );

  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly media: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.viewportSubscription = this.$isHandset.subscribe();
  }

  ngOnDestroy(): void {
    this.viewportSubscription.unsubscribe();
  }

  toggleValue<T>(actualValue: T, conditionalValue: T): T {
    if (this.__isHandset) {
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

  isHandset() {
    return this.__isHandset;
  }

  isNotHandset() {
    return this.__isNotHandset;
  }
}
