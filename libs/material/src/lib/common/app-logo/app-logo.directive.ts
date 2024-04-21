import { Directive, ElementRef, OnInit } from '@angular/core';
import { IElementRef } from '../types';

/**
 * You can style the app-logo using app-logo class
 */
@Directive({
  selector: '[wtAppLogo]',
  standalone: true,
})
export class AppLogoDirective implements IElementRef<HTMLImageElement>, OnInit {
  constructor(public elementRef: ElementRef<HTMLImageElement>) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.classList.add('app-logo');

    this.elementRef.nativeElement.setAttribute(
      'src',
      'assets/icons/icon-72x72.png'
    );

    this.elementRef.nativeElement.setAttribute('alt', 'App Logo');
  }
}
