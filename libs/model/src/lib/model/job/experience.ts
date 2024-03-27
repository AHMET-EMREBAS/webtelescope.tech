import { IID } from '../../common';
/**
 * @param id {@link IID.id}
 * @param jobTitle {@link JobTitle}
 * @param company {@link Company}
 * @param startDate {@link startDate}
 * @param endDate {@link endDate}
 * @param accomplishements {@link Accomplishment}
 * @param target {@link ITarget.target}
 */
export interface IExperience<JobTitle extends IID, Company extends IID> extends IID {
  jobTitle: JobTitle;

  startDate: Date;

  endDate: Date;

  company:Company
}
