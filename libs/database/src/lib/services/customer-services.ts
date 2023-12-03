import { Repository } from 'typeorm';
import { BaseService } from './__base-service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Customer, CustomerType } from '../entities';

@Injectable()
export class CustomerTypeService extends BaseService<CustomerType> {
  constructor(
    @InjectRepository(CustomerType)
    repo: Repository<CustomerType>
  ) {
    super(repo);
  }
}

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer)
    repo: Repository<Customer>
  ) {
    super(repo);
  }
}
