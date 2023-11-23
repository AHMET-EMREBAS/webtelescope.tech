import { Column, Entity, PasswordColumn, SubsRelation } from '../../decorators';
import { BaseEntity } from '../base.entity';

@Entity()
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', required: true, unique: true })
  name!: string;
}

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'varchar', required: true, unique: true })
  name!: string;

  @SubsRelation(Permission)
  permissions!: Permission[];
}

@Entity()
export class Organization extends BaseEntity {
  @Column({ type: 'varchar', required: true, unique: true })
  name!: string;
}

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', required: true, unique: true })
  username!: string;

  @PasswordColumn()
  password!: string;

  @SubsRelation(Role)
  roles!: Role[];
}
