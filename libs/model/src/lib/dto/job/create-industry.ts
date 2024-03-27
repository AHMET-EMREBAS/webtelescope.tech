import { IIndustry } from '../../model';

export interface ICreateIndustryDto extends Pick<IIndustry, 'industryName'> {}
