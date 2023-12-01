import { BaseNameDescriptionEntity } from '@webpackages/core';
import { Entity } from 'typeorm';

@Entity()
export class Product extends BaseNameDescriptionEntity {}
