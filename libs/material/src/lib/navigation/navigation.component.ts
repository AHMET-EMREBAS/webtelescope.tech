import {
  Component,
  Directive,
  Inject,
  NgModule,
  OnInit,
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

export const APP_NAME_TOKEN = Symbol('APP_NAME');
export const NAV_ITEMS_TOKEN = Symbol('NAV_ITEMS');
export const LOCALE_TOKEN = Symbol('LOCALE');

export type NavItem = {
  path: string;
  icon: string;
  label: string;
};

export function provideAppName(appName: string): Provider {
  return {
    provide: APP_NAME_TOKEN,
    useValue: appName,
  };
}

/**
 * provides the selected locale by browser
 * @returns
 */
export function provideLocale(): Provider {
  return {
    provide: LOCALE_TOKEN,
    useValue: window.navigator.language,
  };
}

export function provideNavItems(navItems: NavItem[]): Provider {
  return {
    provide: NAV_ITEMS_TOKEN,
    useValue: navItems,
  };
}

/**
 * Place the navigation content under toolbar-right position
 */
@Directive({ selector: '[wtToolbarRight]', standalone: true })
export class ToolbarRightDirective {}

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
    @Inject(NAV_ITEMS_TOKEN) public readonly navItems: NavItem[],
    @Inject(APP_NAME_TOKEN) public readonly appName: string
  ) {}

  ngOnInit(): void {
    this.title = this.__title.getTitle();
  }
}

@NgModule({
  imports: [NavigationComponent, ToolbarRightDirective],
  exports: [NavigationComponent, ToolbarRightDirective],
})
export class NavigationModule {}
