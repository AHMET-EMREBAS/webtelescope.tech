import { IID, ITimestamp } from '../../common';

/**
 * Each user belongs to an organization
 * @param id {@link IID.id}
 * @param orgname {@link orgname}
 * @extends createdAt {@link ITimestamp.createdAt}
 * @extends updatedAt {@link ITimestamp.updatedAt}
 * @extends deletedAt {@link ITimestamp.deletedAt}
 */
export interface IOrg extends IID, ITimestamp {
  orgname: string;
}
