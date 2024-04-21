import { Color } from './color';

export type MenuItem = {
  label?: string;
  route?: string;
  onClick?: () => void;
  icon?: string;
  iconColor?: Color;
  badge?: string;
  badgeColor?: Color;
  items: MenuItem[];
};
