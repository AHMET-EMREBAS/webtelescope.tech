import { IID, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param projectName {@link projectName}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IProject extends IID, ITimestamp {
  projectName: string;
}
