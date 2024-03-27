import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param skillName {@link skillName}
 * @param industry {@link industry}
 */
export interface ISkill<Industry extends IID> extends IID {
  skillName: string;
  industry: Industry;
}
