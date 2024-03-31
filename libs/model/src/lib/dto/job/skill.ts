import { IID } from '../../common';
import { ISkill } from '../../model';

export interface ICreateSkillDto
  extends Pick<ISkill<IID>, 'industry' | 'skillName'> {}
