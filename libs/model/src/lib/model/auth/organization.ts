import { IID, ITimestamp } from '../../common';

/**
 * Each user belongs to an organization
 * @param id {@link IID.id}
 * @param organizationName {@link organizationName}
 * @extends createdAt {@link ITimestamp.createdAt}
 * @extends updatedAt {@link ITimestamp.updatedAt}
 * @extends deletedAt {@link ITimestamp.deletedAt}
 */
export interface IOrganization extends IID, ITimestamp {
  organizationName: string;
}

