import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Price, PriceView } from '@webpackages/gen-entity';

@Injectable()
export class PriceService extends RepositoryService<Price> {
  constructor(@InjectRepository(Price) repo: Repository<Price>) {
    super(repo);
  }
}

@Injectable()
export class PriceViewService extends RepositoryService<PriceView> {
  constructor(@InjectRepository(PriceView) repo: Repository<PriceView>) {
    super(repo);
  }
}
