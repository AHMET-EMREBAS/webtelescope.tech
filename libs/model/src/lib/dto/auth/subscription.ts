import { ISubscription } from '../../model';

export interface ICreateSubscriptionDto
  extends Pick<ISubscription, 'subscriptionName' | 'description'> {}
