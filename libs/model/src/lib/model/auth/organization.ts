import { IID, IName, ITimestamp } from '../../common';

/**
 * Each user belongs to an organization
 * @param id {@link IID.id}
 * @param name {@link IName.name}
 * @extends IName {@link IName}
 * @extends ITimestamp {@link ITimestamp}
 */
export interface IOrganization extends IName, IID, ITimestamp {}
