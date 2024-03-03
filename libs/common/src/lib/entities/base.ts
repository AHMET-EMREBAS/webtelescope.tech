export interface IID {
  id: number;
}

export interface IBasicEntity extends IID {}

export interface ITimestampEntity extends IBasicEntity {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IOwnedEntity<T = unknown> extends ITimestampEntity {
  owner: T;
}
