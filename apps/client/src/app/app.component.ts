import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCommon } from './common/';
import { AppLayoutModule } from 'dist/libs/material/layout';

@Component({
  standalone: true,
  imports: [RouterModule, AppLayoutModule],
  selector: 'wt-root',
  template: `
    <wt-app-layout>
      <ng-template wtMainContentF></ng-template>
      <router-outlet></router-outlet>
    </wt-app-layout>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent extends AppCommon {}
