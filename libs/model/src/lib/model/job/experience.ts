import { IID } from '../../common';
/**
 * @param id {@link IID.id}
 * @param occupation {@link Occupation}
 * @param startDate {@link startDate}
 * @param endDate {@link endDate}
 * @param accomplishements {@link Accomplishment}
 * @param target {@link ITarget.target}
 */
export interface IExperience<Occupation extends IID> extends IID {
  occupation: Occupation;

  startDate: Date;

  endDate: Date;
}
