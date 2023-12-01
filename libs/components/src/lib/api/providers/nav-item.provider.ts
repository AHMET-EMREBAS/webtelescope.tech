import { Provider } from '@angular/core';

export const NAV_ITEMS_TOKEN = 'NAV_ITEMS_TOKEN';

export type NavItemParams = {
  ignoreLastRoute?: boolean;
};

export class NavItem {
  route!: string;
  name!: string;
  icon!: string;
  params?: NavItemParams;
  position?: 'right' | 'left' | 'center';
}

export function provideNavItems(navItems: NavItem[]): Provider {
  return {
    provide: NAV_ITEMS_TOKEN,
    useValue: navItems,
  };
}
