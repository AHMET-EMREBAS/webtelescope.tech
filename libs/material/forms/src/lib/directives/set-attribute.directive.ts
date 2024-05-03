import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { PropertyOptions } from '@webpackages/meta';
@Directive({
  selector: '[wtSetAttribute]',
  standalone: true,
})
export class SetAttributeDirective implements AfterViewInit {
  @Input() wtSetAttribute?: PropertyOptions;
  constructor(public readonly elementRef: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    Object.entries(this.wtSetAttribute || {}).forEach(([key, value]) => {
      if (value != undefined) {
        this.elementRef.nativeElement.setAttribute(key, value as string);
      }
    });
  }
}
