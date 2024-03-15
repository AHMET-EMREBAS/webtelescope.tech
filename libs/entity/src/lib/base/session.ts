/* eslint-disable @typescript-eslint/no-explicit-any */
import { ViewEntity, DataSource, ViewColumn } from 'typeorm';
import { Column, Entity, Owner } from '../decorators';
import { IDEntity } from './base';
import { User } from './user';

@Entity()
export class Session extends IDEntity {
  @Column({ type: 'number' }) uid!: number;
  @Column({ type: 'object' }) user!: User;
}

@Entity()
export class SessionRecord extends IDEntity {
  @Column({ type: 'string', required: true }) key!: string;
  @Column({ type: 'object', required: true }) value!: any;
  @Owner(Session) session!: Session;
}

@ViewEntity({
  expression(ds: DataSource) {
    return ds
      .createQueryBuilder()
      .select('s.id', 'id')
      .addSelect('s.uid', 'uid')
      .addSelect('r.id', 'rid')
      .addSelect('r.key', 'key')
      .addSelect('r.value', 'value')
      .from(Session, 's')
      .leftJoin(SessionRecord, 'r', 'r.sessionId = s.id');
  },
})
export class SessionView {
  @ViewColumn() id!: number;
  @ViewColumn() uid!: number;
  @ViewColumn() rid!: number;
  @ViewColumn() key!: string;
  @ViewColumn() value!: string;
}
