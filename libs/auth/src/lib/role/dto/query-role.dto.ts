import { Exclude } from 'class-transformer';
import { QueryDto } from '@webpackages/core';

@Exclude()
export class QueryRoleDto extends QueryDto {}
