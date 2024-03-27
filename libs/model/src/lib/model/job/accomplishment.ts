import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param description {@link description}
 * @param occupation {@link Occupation}
 */
export interface IAccomplishment<JobTitle> extends IID {
  description: string;
  jobTitle: JobTitle;
}
