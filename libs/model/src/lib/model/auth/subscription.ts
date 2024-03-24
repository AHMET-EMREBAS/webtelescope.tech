import { IID, IName } from '../../common';

/**
 * Store the name of subscriptions.
 * Some applications provide multiple subscription types like basic, medium, advance, gold, premium etc.
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 */
export interface ISubscription extends IName, IID {}
