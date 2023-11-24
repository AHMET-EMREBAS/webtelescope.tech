/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor } from 'class-transformer';

/**
 * owner relation is like user and contact entity
 * sub relation is like product and category entity
 * subs relation is like product and feature entity
 */
export type RelationType = 'owner' | 'sub' | 'subs';

export type RelationOptions = {
  type: RelationType;
  target: ClassConstructor<any>;
};

export function Relation(options: RelationOptions) {}
