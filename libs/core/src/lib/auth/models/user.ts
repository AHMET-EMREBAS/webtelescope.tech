export interface __IID {
  id: number;
}

export interface IScope extends __IID {
  name: string;
}

export interface IPermission extends __IID {
  name: string;
}
export interface IRole extends __IID {
  name: string;
  permissions?: IPermission[];
}

export interface IAuthUser extends __IID {
  username: string;
  password: string;
  roles?: IRole[];
  scopes?: IScope[];
}
