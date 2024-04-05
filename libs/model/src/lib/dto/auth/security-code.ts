import { ISecurityCode } from '../../model';

export interface ICreateSecurityCodeDto
  extends Pick<ISecurityCode, 'securityCode' | 'userId'> {}
