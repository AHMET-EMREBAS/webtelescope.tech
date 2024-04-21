import { Color } from './color';

export type MenuItem = {
  id: number;
  title?: string;
  subTitle?: string;
  meta?: string;
  route?: string;
  onClick?: () => void;
  icon?: string;
  iconColor?: Color;
  badge?: string;
  badgeColor?: Color;
  items?: MenuItem[];
};
