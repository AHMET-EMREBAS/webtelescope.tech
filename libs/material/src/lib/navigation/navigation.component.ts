import {
  Component,
  Inject,
  OnInit,
  Optional,
  Provider,
  inject,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

const APP_NAME = Symbol('APP_NAME');
const NAV_ITEMS = Symbol('NAV_ITEMS');

export type NavItem = {
  path: string;
  icon: string;
  label: string;
};

export function provideAppName(appName: string): Provider {
  return {
    provide: APP_NAME,
    useValue: appName,
  };
}

export function provideNavItems(navItems: NavItem[]): Provider {
  return {
    provide: NAV_ITEMS,
    useValue: navItems,
  };
}

@Component({
  selector: 'wt-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,

    RouterModule,

    AsyncPipe,
    NgFor,
    NgIf,
  ],
})
export class NavigationComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  title = '';

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readonly __title: Title,
    @Inject(NAV_ITEMS) public readonly navItems: NavItem[],
    @Optional() @Inject(APP_NAME) public readonly appName: string
  ) {}

  ngOnInit(): void {
    this.title = this.__title.getTitle();
  }
}
