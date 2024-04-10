import { IID, ITimestamp } from '../../common';

/**
 * Store the name of subscriptions.
 * Some applications provide multiple subscription types like basic, medium, advance, gold, premium etc.
 * @param id {@link IID.id}
 * @param subscriptionName {@link subname}
 * @param description {@link description}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface ISubType extends ITimestamp, IID {
  subname: string;
  description?: string;
}
