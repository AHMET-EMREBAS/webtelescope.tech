/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrg, IPermission, IRole, ISession, IUser } from '../auth';

export interface IRequestHeaders {
  authorization: string;
  'x-orgname': string;
  'x-oauthapikey': string;
}

export interface IRequestParams {
  id: string;
  relationId: string;
  relationName: string;
}

export interface IRequest<
  Query = Record<string, any>,
  Body = Record<string, any>
> {
  query: Query;
  body: Body;
  session: ISession;
  user: IUser<IOrg, IRole<IPermission>>;
  headers: IRequestHeaders;
  params: IRequestParams;
}
