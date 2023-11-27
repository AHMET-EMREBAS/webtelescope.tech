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
} from '../../api';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'wt-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
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
})
export class NavigationComponent implements AfterViewInit {
  protected readonly lastRouteStoreKey = `last_route`;
  protected readonly miniSideNavStoreKey = `mini_sidenav`;

  @ViewChild('drawer') drawer!: MatDrawer;

  private breakpointObserver = inject(BreakpointObserver);
  readonly title = inject(Title);

  miniSidenav = this.lss.get<boolean>(this.miniSideNavStoreKey, false);

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
    @Inject(APP_NAME_TOKEN) public readonly appName: string,
    @Inject(MODULE_NAME_TOKEN) public readonly moduleName: string,
    protected readonly lss: LocalStoreService,
    protected readonly router: Router,
    protected readonly route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    const lastRoute = this.lss.get(this.lastRouteStoreKey);
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
    this.lss.set(this.miniSideNavStoreKey, this.miniSidenav);
    await this.drawer.close();
    await this.drawer.open();
  }

  canPersistRoute(navItem: NavItem) {
    return /[a-z-]{1,}/.test(navItem.route);
  }

  homePageClickHandler() {
    this.lss.set(this.lastRouteStoreKey, '');
  }

  navItemClickHandler(navItem: NavItem) {
    if (this.isHandset && !this.miniSidenav) this.drawer.close();

    if (this.canPersistRoute(navItem)) {
      this.lss.set(this.lastRouteStoreKey, navItem.route);
    }
  }
}
