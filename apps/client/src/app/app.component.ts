import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'wt-root',
  template: `
    <div
      class="wt d-flex fd-row fw-wrap jc-space-between gap-1em w-80per bw-1em bs-solid bc-orange child:w-50px child:h-50px child:bw-3px child:bs-solid  child:w-30% last-child:w-100per "
    >
      <div class="first-letter:c-red selection:bg-purple ls-1em ">First</div>
      <div
        class="lmd:t-translateX(1per)|rotate(1deg)-1000ms msm:t-translateX(100per)|rotate(30deg)-1000ms"
      >
        Second
      </div>
      <div>Third</div>
      <div>Last</div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  handle = () => console.log('CLicked');
}
