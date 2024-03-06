import { CommonModule } from '@angular/common';
import { Component, Directive, HostListener } from '@angular/core';

import { RouterModule } from '@angular/router';

@Directive({ selector: '[wtCtrlClickDirective]', standalone: true })
export class CtrlClickDirective {
  @HostListener('click', ['$event'])
  ctrlClickEvent(event: MouseEvent) {
    if (event.ctrlKey) {
      console.log('CTRL + Left Click');
    } else {
      console.log('Just click');
    }
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, CtrlClickDirective],
  selector: 'wt-root',
  template: ` <button wtCtrlClickDirective>Click Me</button>

    @for (item of words; track $index) { @if(item.startsWith("###")){
    <h3>{{ item }}</h3>
    } @else if (item.startsWith("***")) {
    <strong></strong>
    } }
    <router-outlet></router-outlet>`,
})
export class AppComponent {
  words = `###Title some content goes here **important** content`.split(' ');

  normalizeText() {}
}
