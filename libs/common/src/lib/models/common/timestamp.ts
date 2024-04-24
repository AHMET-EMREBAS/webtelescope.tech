/**
 * @param id
 * @param createdAt
 * @param updatedAt
 * @param deletedAt
 */
export interface ITimestamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IQueryTimestampDto extends Partial<ITimestamp> {}
