export interface IAuthPermission {
  name: string;
}
export interface IAuthRole {
  name: string;
  permissions?: IAuthPermission[];
}

export interface IAuthUser {
  username: string;
  password: string;
  roles?: IAuthRole[];
}
