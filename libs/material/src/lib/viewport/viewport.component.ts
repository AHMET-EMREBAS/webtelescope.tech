import { Component, Directive, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[wtViewport]',
})
export class ViewportDirective {}

@Component({
  selector: 'wt-viewport',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewport.component.html',
  styleUrl: './viewport.component.scss',
})
export class ViewportComponent {
  constructor(public readonly elementRef: ElementRef<HTMLElement>) {}
}
