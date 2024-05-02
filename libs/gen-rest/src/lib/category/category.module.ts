import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@webpackages/core';
import { Category } from '@webpackages/gen-entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryView } from '@webpackages/gen-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryView])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
