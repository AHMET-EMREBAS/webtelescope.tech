import { IID, IOwner } from '../../common';

/**
 * ShopingCart is associated with one/many orders and an owner( customer )
 * @param id {@link IID.id}
 * @param owner {@link IOwner.owner}
 */
export interface IShoppingCart<Owner extends IID> extends IID, IOwner<Owner> {}
