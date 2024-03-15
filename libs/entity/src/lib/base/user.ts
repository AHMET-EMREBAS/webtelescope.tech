import { Column, Entity, Many, Relation } from '../decorators';
import { BaseEntity } from './base';
import { NameEntity } from './name';

@Entity()
export class Permission extends NameEntity {}

@Entity()
export class Role extends NameEntity {
  @Relation({ type: 'Many', target: Permission })
  permissions!: Permission[];
}

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'string', required: true, unique: true })
  username!: string;

  @Column({ type: 'string', hash: true, required: true })
  password!: string;

  @Many(Role)
  roles!: Role[]
}
