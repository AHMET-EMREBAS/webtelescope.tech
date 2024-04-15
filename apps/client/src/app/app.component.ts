import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthClientService } from '@webpackages/auth-client';
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'wt-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private readonly authClientService: AuthClientService) {
    // this.authClientService
    //   .login({
    //     username: 'wtinventory@webtelescope.tech',
    //     password: '!Password123.',
    //   })
    //   .subscribe(console.log)
    //   .unsubscribe();

    this.authClientService
      .createNewSubType({
        subtype: 'Other one',
        description: 'Some Other',
      })
      .subscribe(console.log);
  }
}
