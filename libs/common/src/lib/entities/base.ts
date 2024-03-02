export interface IBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  active: boolean;
  uuid: string;
}
