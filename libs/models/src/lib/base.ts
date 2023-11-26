import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '@webpackages/common';
import { Exclude, Expose } from 'class-transformer';
import { Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity implements BaseModel {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt!: Date;
  @Column({ type: 'boolean', nullable: true, default: true }) active!: boolean;
}

@Exclude()
export class IDDto {
  @Expose()
  @ApiProperty({ type: 'integer', minimum: 1 })
  @Min(1)
  id!: number;
}
