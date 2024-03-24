import { IID, INameDescription, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param name {@link INameDescription.name}
 * @param description {@link INameDescription.description}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IProject extends IID, ITimestamp, INameDescription {}
