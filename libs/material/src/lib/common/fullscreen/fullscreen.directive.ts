import { Directive, HostListener, Input } from '@angular/core';
import { IToggle, IToggleValue } from '../types';

@Directive({
  selector: '[wtFullscreen]',
  standalone: true,
  exportAs: 'wtFullscreen',
})
export class FullscreenDirective implements IToggleValue, IToggle {
  @Input() targetElement?: HTMLElement;
  @HostListener('click')
  clickHander() {
    if (this.targetElement) {
      this.toggle(this.targetElement);
    } else {
      console.warn('targetElement is not provided to the fullscreen directive');
    }
  }

  isFullscreen?: boolean;

  private open(element: HTMLElement) {
    this.isFullscreen = true;
    element.requestFullscreen();
  }
  private close() {
    this.isFullscreen = false;
    document.exitFullscreen();
  }

  /**
   * Toggle fullscreen
   * @param element
   */
  toggle(element: HTMLElement): void {
    if (this.isFullscreen) {
      this.close();
    } else {
      this.open(element);
    }
  }

  toggleValue<T>(actualValue: T, conditionalValue: T): T {
    return this.isFullscreen ? conditionalValue : actualValue;
  }
}
