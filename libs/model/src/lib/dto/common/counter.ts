import { IID } from '../../common';
import { ICounter } from '../../model';

/**
 * @ref {@link ICounter}
 */
export interface ICreateCounterDto
  extends Pick<ICounter<IID, IID>, 'user' | 'target'> {}
