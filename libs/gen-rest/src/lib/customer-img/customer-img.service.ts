import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { CustomerImg, CustomerImgView } from '@webpackages/gen-entity';

@Injectable()
export class CustomerImgService extends RepositoryService<CustomerImg> {
  constructor(@InjectRepository(CustomerImg) repo: Repository<CustomerImg>) {
    super(repo);
  }
}

@Injectable()
export class CustomerImgViewService extends RepositoryService<CustomerImgView> {
  constructor(
    @InjectRepository(CustomerImgView) repo: Repository<CustomerImgView>
  ) {
    super(repo);
  }
}
