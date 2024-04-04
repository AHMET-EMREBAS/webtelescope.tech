import { IPriceLevel } from '@webpackages/model';
import { IDEntity, StringColumn, Entity } from '@webpackages/typeorm';

@Entity()
export class PriceLevel extends IDEntity implements IPriceLevel {
  @StringColumn() priceLevelName!: string;
}
