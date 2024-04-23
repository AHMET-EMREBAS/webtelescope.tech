import { Directive, HostListener, Input, NgModule } from '@angular/core';
import { IToggle, IToggleValue } from '../types';

@Directive({
  selector: '[wtFullscreenToggleButton]',
  standalone: true,
})
export class FullscreenToggleDirective implements IToggle {
  @Input() targetElement?: HTMLElement;

  @HostListener('click')
  fullscreenButtonClick() {
    if (this.targetElement) {
      this.toggle(this.targetElement);
    } else {
      console.warn('targetElement is not provided to the fullscreen directive');
    }
  }

  private open(element: HTMLElement) {
    FullscreenDirective.isFullscreen = true;
    element.requestFullscreen();
  }

  private close() {
    FullscreenDirective.isFullscreen = false;
    document.exitFullscreen();
  }

  /**
   * Toggle fullscreen
   * @param element
   */
  toggle(element: HTMLElement): void {
    if (FullscreenDirective.isFullscreen) {
      this.close();
    } else {
      this.open(element);
    }
  }
}

// Access the fullscreen information accross the application
// And toggle values based on it.
@Directive({
  selector: '[wtFullscreen]',
  standalone: true,
  exportAs: 'wtFullscreen',
})
export class FullscreenDirective implements IToggleValue {
  static isFullscreen = false;

  toggleValue<T>(actualValue: T, conditionalValue: T): T {
    return FullscreenDirective.isFullscreen ? conditionalValue : actualValue;
  }

  isFullscreen() {
    return FullscreenDirective.isFullscreen;
  }
}

@NgModule({
  imports: [FullscreenDirective, FullscreenToggleDirective],
  exports: [FullscreenDirective, FullscreenToggleDirective],
})
export class FullscreenModule {}
