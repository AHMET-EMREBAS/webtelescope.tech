import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  imports: [RouterModule, ButtonModule],
  selector: 'wt-root',
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
