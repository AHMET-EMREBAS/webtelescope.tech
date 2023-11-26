import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AUTH_TOKEN_NAME } from '@webpackages/common';
import { Permissions } from '@webpackages/auth';
import { ValidationPipe } from '@webpackages/rest';
import { CreateProductDto, QueryProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@ApiBearerAuth(AUTH_TOKEN_NAME)
@Controller()
export class ProductController {
  constructor(protected readonly productService: ProductService) {}

  @Permissions('product:read')
  @Get('products')
  async findAllProducts(@Query(ValidationPipe) query: QueryProductDto) {
    return this.productService.find(query);
  }

  @Permissions('product:read')
  @Get('product/:id')
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneById(id);
  }
  @Permissions('product:read')
  @Post('product')
  async save(@Body(ValidationPipe) entity: CreateProductDto) {
    return this.productService.save(entity);
  }

  @Permissions('product:update')
  @Put('product/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) entity: UpdateProductDto
  ) {
    return this.productService.update(id, entity);
  }

  @Permissions('product:delete')
  @Delete('product/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
