import { IDepartment } from '@webpackages/model';
import { Entity, IDEntity, StringColumn } from '@webpackages/typeorm';

@Entity()
export class Department extends IDEntity implements IDepartment {
  @StringColumn({ unique: true }) department!: string;
}
