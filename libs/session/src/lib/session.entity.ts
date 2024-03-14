/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entity,
  BaseEntity,
  Column,
  IDEntity,
  Owner,
} from '@webpackages/entity';
import { ViewEntity, DataSource, ViewColumn } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  @Column({
    type: 'date',
    required: true,
  })
  expiration?: Date;
}

@Entity()
export class SessionRecord extends IDEntity {
  @Column({ type: 'string', required: true }) key!: string;
  @Column({ type: 'string', required: true }) value!: string;
  @Owner(Session) session!: Session;
}

@ViewEntity({
  expression(ds: DataSource) {
    return ds
      .createQueryBuilder()
      .select('s.id', 'id')

      .addSelect('r.key', 'key')
      .addSelect('r.value', 'value')
      .addSelect('r.id', 'rid')
      .from(Session, 's')
      .leftJoin(SessionRecord, 'r', 's.id = r.sessionId');
  },
})
export class SessionView {
  /**
   * Session id
   */
  @ViewColumn() id!: number;

  /**
   * Record id
   */
  @ViewColumn() rid!: number;
  /**
   * Record name
   */
  @ViewColumn() key!: string;

  /**
   * Record value
   */
  @ViewColumn() value!: string;
}
