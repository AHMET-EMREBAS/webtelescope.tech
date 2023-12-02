import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  inject,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  APP_NAME_TOKEN,
  LocalStoreService,
  MODULE_NAME_TOKEN,
  NAV_ITEMS_TOKEN,
  NavItem,
  NavItemParams,
  STATUSBAR_ITEMS_TOKEN,
  TOOLBAR_ITEMS_TOKEN,
} from '../../api';
import { MatTooltipModule } from '@angular/material/tooltip';
import '@angular/localize/init';

export const LAST_ROUTE_STOREKEY = 'last_route';
export const MINI_SIDENAV_STOREKEY = 'mini_sidenav';

@Component({
  selector: 'wt-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  private breakpointObserver = inject(BreakpointObserver);
  readonly title = inject(Title);

  miniSidenav = this.lss.get<boolean>(MINI_SIDENAV_STOREKEY, false);

  isHandset = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => {
        this.isHandset = result.matches;
        return this.isHandset;
      }),
      shareReplay()
    );

  constructor(
    @Inject(NAV_ITEMS_TOKEN) public readonly navItems: NavItem[],
    @Inject(TOOLBAR_ITEMS_TOKEN) public readonly toolbarItems: NavItem[],
    @Inject(STATUSBAR_ITEMS_TOKEN) public readonly statusbarItems: NavItem[],
    @Inject(APP_NAME_TOKEN) public readonly appName: string,
    @Inject(MODULE_NAME_TOKEN) public readonly moduleName: string,
    protected readonly lss: LocalStoreService,
    protected readonly router: Router,
    protected readonly route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    const lastRoute = this.lss.get(LAST_ROUTE_STOREKEY);
    const params: NavItemParams = this.route.snapshot
      .queryParams as NavItemParams;
    if (params.ignoreLastRoute) {
      return;
    } else if (lastRoute) {
      this.router.navigate([lastRoute], { relativeTo: this.route });
    }
  }

  async toggleMiniSidenav() {
    this.miniSidenav = !this.miniSidenav;
    this.lss.set(MINI_SIDENAV_STOREKEY, this.miniSidenav);
    await this.drawer.close();
    await this.drawer.open();
  }

  canPersistRoute(navItem: NavItem) {
    return /[a-z-]{1,}/.test(navItem.route);
  }

  homePageClickHandler() {
    this.lss.set(LAST_ROUTE_STOREKEY, '');
  }

  navItemClickHandler(navItem: NavItem) {
    if (this.isHandset && !this.miniSidenav) this.drawer.close();

    if (this.canPersistRoute(navItem)) {
      this.lss.set(LAST_ROUTE_STOREKEY, navItem.route);
    }
  }
}
