import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../entity';
import { hashSync, genSaltSync } from 'bcrypt';

export type SessionPayload = {
  sub: number;
};

@Entity()
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) name!: string;
}

@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) name!: string;

  @ManyToMany(() => Permission, (p) => p.id, { eager: true })
  @JoinTable()
  permissions!: Permission[];
}

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true }) username!: string;

  @Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return value && hashSync(value, genSaltSync(8));
      },
      from(value) {
        return value;
      },
    },
  })
  password!: string;

  @ManyToMany(() => Role, (r) => r.id, { eager: true })
  @JoinTable()
  roles!: Role[];
}

@Entity()
export class Session extends BaseEntity {
  @Column({ type: 'numeric' }) userId!: number;
  @Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return value && JSON.stringify(value);
      },
      from(value) {
        return value && JSON.parse(value);
      },
    },
  })
  roles!: string[];

  @Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return value && JSON.stringify(value);
      },
      from(value) {
        return value && JSON.parse(value);
      },
    },
  })
  permissions!: string[];
}
