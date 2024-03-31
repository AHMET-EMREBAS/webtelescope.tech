import { IPriceLevel } from '../../model';

export interface ICreatePriceLevelDto
  extends Pick<IPriceLevel, 'priceLevelName'> {}
