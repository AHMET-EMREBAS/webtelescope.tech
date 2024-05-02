import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Quantity, QuantityView } from '@webpackages/gen-entity';

@Injectable()
export class QuantityService extends RepositoryService<Quantity> {
  constructor(@InjectRepository(Quantity) repo: Repository<Quantity>) {
    super(repo);
  }
}

@Injectable()
export class QuantityViewService extends RepositoryService<QuantityView> {
  constructor(@InjectRepository(QuantityView) repo: Repository<QuantityView>) {
    super(repo);
  }
}
