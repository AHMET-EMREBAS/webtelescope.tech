import { IID } from '../../common';

/**
 * @param id {@link IID.id}
 * @param companyName {@link companyName}
 * @param companyDomain {@link companyDomain}
 */
export interface ICompany<Industry extends IID> extends IID {
  companyName: string;
  companyDomain: string;
  industries: Industry[];
}
