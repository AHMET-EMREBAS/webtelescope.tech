import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'wt-root',
  template: `<div class="wt w-200px bw-10px bs-solid  mxs:fs-20em-1000ms">Hello</div>
    <router-outlet></router-outlet>`,
})
export class AppComponent {}
