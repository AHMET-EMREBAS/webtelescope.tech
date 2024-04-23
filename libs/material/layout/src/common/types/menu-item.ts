import { Color } from './color';
import { Icon } from './icons';

export type MenuItem = {
  id?: number;
  title: string;
  subtitle?: string;
  meta?: string;
  route?: string;
  onClick?: () => void;
  icon?: Icon;
  iconColor?: Color;
  badge?: string;
  badgeColor?: Color;
  items?: MenuItem[];
};
