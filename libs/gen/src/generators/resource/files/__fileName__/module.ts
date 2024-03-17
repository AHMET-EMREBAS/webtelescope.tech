import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { <%- className %> } from './entity';
import { <%- className %>Controller } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([<%- className %>])],
  controllers: [<%- className %>Controller],
})
export class <%- className %>Module {}
