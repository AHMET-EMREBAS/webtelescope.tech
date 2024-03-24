import { IID, INameDescription, ITarget } from '../../common';
/**
 * @param id {@link IID.id}
 * @param name {@link INameDescription.name}
 * @param description {@link INameDescription.description}
 * @param target {@link ITarget.target} Project
 */
export interface ISprint<Target extends IID>
  extends IID,
    INameDescription,
    ITarget<Target> {}
