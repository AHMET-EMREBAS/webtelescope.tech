import { PartialType } from '@nestjs/swagger';
import { Create<%- className %>Dto } from './create';
import { Exclude } from 'class-transformer';

@Exclude()
export class Update<%- className %>Dto extends PartialType(Create<%- className %>Dto) {}
