import { BaseEntity } from './../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { QueryDto } from '../dtos/query';
import { NotFoundException, Type } from '@nestjs/common';
import { IDDto } from '../dtos';

export class QueryService<T extends BaseEntity> {
  constructor(protected repo: Repository<T>) {}

  /**
   * Find all items by QueryDto
   * @param queryDto
   * @returns T[]
   */
  async find(queryDto: QueryDto): Promise<T[]> {
    return await this.repo.find(queryDto);
  }

  async findOneById(idDto: IDDto): Promise<T> {
    const found = await this.repo.findOneBy({
      id: idDto.id,
    } as FindOptionsWhere<T>);

    if (found) {
      return found;
    }

    throw new NotFoundException(`Entity not found by id ${idDto.id}`);
  }
}
