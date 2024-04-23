export interface IAuthModelId {
  id: number;
}

export interface IAuthScope extends IAuthModelId {
  name: string;
}

export interface IAuthPermission extends IAuthModelId {
  name: string;
}
export interface IAuthRole extends IAuthModelId {
  name: string;
  permissions?: IAuthPermission[];
}

export interface IAuthUser extends IAuthModelId {
  username: string;
  password: string;
  roles?: IAuthRole[];
  scopes?: IAuthScope[];
}
