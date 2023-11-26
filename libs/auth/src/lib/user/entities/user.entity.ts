import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@webpackages/rest';
import { genSaltSync, hashSync } from 'bcrypt';
import { Role } from '../../role';
@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({
    type: 'varchar',
    transformer: {
      to(value) {
        return hashSync(value, genSaltSync(8));
      },
      from(value) {
        return value;
      },
    },
  })
  password!: string;

  @ManyToMany(() => Role, (r) => r.id, { eager: true, nullable: true })
  @JoinTable()
  roles!: Role[];
}
