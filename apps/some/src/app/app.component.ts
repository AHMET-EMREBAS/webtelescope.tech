import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'wt-root',
  template: `<h1>Welcome some</h1>
    <router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
