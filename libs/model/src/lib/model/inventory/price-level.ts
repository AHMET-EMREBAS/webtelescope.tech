import { IID, IName } from '../../common';

/**
 * Price level allows us to create multiple prices based on store, and customer profile,
 * such as wholesale price, retail price, vip customer price, friday price etc.
 * Each store might have different price for a product.
 * Each price is associated with a price level.
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 */
export interface IPriceLevel extends IID, IName {}
