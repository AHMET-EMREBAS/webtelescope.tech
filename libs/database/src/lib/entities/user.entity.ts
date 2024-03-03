import { IPermission, IRole, IUser } from '@webpackages/common';
import { BasicEntity, TimestampEntity } from '../base';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { genSaltSync, hashSync } from 'bcrypt';

@Entity()
export class Permission extends BasicEntity implements IPermission {
  @Column({ type: 'varchar', unique: true })
  name!: string;
}

@Entity()
export class Role extends BasicEntity implements IRole<Permission> {
  @Column({ type: 'varchar' }) name!: string;

  @ManyToMany(() => Permission, (p) => p.id, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    lazy: true,
  })
  @JoinTable()
  permissions!: Permission[];
}

@Entity()
export class User extends TimestampEntity implements IUser<Role> {
  @Column({ type: 'varchar', unique: true }) username!: string;
  @Column({
    type: 'varchar',
    transformer: {
      to: (value) => hashSync(value, genSaltSync(8)),
      from: (value) => value,
    },
  })
  password!: string;

  @ManyToMany(() => Role, (r) => r.id, { nullable: true, eager: true })
  @JoinTable()
  roles!: Role[];
}
