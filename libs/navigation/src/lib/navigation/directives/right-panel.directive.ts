import { Directive } from '@angular/core';

@Directive({
  selector: '[wtRightPanel]',
  standalone: true,
  exportAs: 'wtRightPanel',
})
export class RightPanelDirective {
  constructor() {}
}
