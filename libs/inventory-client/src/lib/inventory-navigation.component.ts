import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavItem } from '@webpackages/components';
@Component({
  selector: 'wt-inventory-navigation',
  templateUrl: './inventory-navigation.component.html',
  styleUrls: ['./inventory-navigation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
})
export class InventoryNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  navItems: NavItem[] = [
    {
      icon: 'inventory',
      label: 'Product',
      route: 'product',
    },
    {
      icon: 'category',
      label: 'Category',
      route: 'category',
    },
    {
      icon: 'money',
      label: 'Price',
      route: 'price',
    },
    {
      icon: 'numbers',
      label: 'Quantity',
      route: 'quantity',
    },
    {
      icon: 'numbers',
      label: 'Quantity',
      route: 'quantity',
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(public readonly title: Title) {}
}
