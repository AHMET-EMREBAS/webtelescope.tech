import { Provider } from '@angular/core';

export const NAV_ITEMS_TOKEN = 'NAV_ITEMS_TOKEN';
export const TOOLBAR_ITEMS_TOKEN = 'TOOLBAR_ITEMS_TOKEN';
export const STATUSBAR_ITEMS_TOKEN = 'STATUSBAR_ITEMS_TOKEN';

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

export function provideToolbarItems(toolbarItems: NavItem[]): Provider {
  return {
    provide: TOOLBAR_ITEMS_TOKEN,
    useValue: toolbarItems,
  };
}

export function provideStatusbarItems(statusbarItems: NavItem[]): Provider {
  return {
    provide: STATUSBAR_ITEMS_TOKEN,
    useValue: statusbarItems,
  };
}
