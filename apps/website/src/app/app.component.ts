import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommon } from './common/';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'wt-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent extends AppCommon {}
