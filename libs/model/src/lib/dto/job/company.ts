import { IID } from '../../common';
import { ICompany } from '../../model';

export interface ICreateCompanyDto
  extends Pick<ICompany<IID>, 'companyName' | 'companyDomain' | 'industries'> {}
