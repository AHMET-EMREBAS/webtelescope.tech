import { Column, Entity, PasswordColumn } from '../../decorators';
import { BaseEntity } from '../base.entity';

@Entity()
export class App extends BaseEntity<App> {
  @Column({ type: 'varchar', required: true, unique: true })
  name!: string;
}

@Entity()
export class Subscription extends BaseEntity<Subscription> {
  @Column({ type: 'varchar', required: true, unique: true }) useranme!: string;
  @PasswordColumn() password!: string;

  @Column({ type: 'varchar', required: true }) appName!: string;
}
