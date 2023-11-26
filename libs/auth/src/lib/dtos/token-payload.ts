import { Role } from '../role';

export class TokenPayload {
  constructor(public readonly sub: number, public readonly roles: Role[]) {}
}
