import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '@webpackages/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    ButtonComponent,
    MatAutocompleteModule,
    MatBadgeModule,
  ],
  selector: 'wt-root',
  template: `
    <div class="wt d-flex fd-row lmd:fd-column bs-solid bw-10px w-50per-1000ms lmd:w-100per ">
      <button class="wt as-stretch grow-3">Hello there</button>
      <button class="wt as-center ">Hello there</button>
      <button class="wt ">Hello there</button>
      <button class="wt as-end  ">Hello there</button>
      <button class="wt  as-stretch">Hello there</button>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  handle = () => console.log('CLicked');
}
