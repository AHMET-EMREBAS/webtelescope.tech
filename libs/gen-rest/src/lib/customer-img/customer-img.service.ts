import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerImg } from '@webpackages/gen-entity';

@Injectable()
export class CustomerImgService extends RepositoryService<CustomerImg> {
  constructor(@InjectRepository(CustomerImg) repo: Repository<CustomerImg>) {
    super(repo);
  }
}
