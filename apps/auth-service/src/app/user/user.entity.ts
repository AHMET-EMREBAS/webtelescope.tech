import { Column, Entity } from '@webpackages/column';
import { PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column() username: string;
}
