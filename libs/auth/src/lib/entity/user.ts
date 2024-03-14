export interface IAuthPermission {
  id: number;
  name: string;
}

export interface IAuthRole {
  id: string;
  name: string;
  permissions: IAuthPermission[];
}

export interface IAuthUser {
  id: number;
  username: string;
  password: string;
  roles: IAuthRole[];
}
