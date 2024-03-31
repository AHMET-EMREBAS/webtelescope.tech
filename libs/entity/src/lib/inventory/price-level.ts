import { IPriceLevel } from '@webpackages/model';
import { IDEntity, NameColumn, Entity } from '@webpackages/typeorm';

@Entity()
export class PriceLevel extends IDEntity implements IPriceLevel {
  @NameColumn() priceLevelName!: string;
}
