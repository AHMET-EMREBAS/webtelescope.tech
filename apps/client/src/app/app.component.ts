import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@webpackages/material';

@Component({
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  selector: 'wt-root',
  template: `
    <h1>Welcome client</h1>
    <hr />
    <wt-button label="some" (click)="handle()"></wt-button>
    <router-outlet></router-outlet>
    <hr />
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  handle = () => console.log('CLicked');
}
