import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'wt-root',
  template: ` <h1 i18n>Hello There!</h1>
    <div style="display: flex; flex-direction: row ; gap: 3em;">
      <a [routerLink]="['/en']">EN</a>
      <a [routerLink]="['/tr']">TR</a>
      <a [routerLink]="['/es']">ES</a>
    </div>
    <router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
