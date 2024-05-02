import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { PriceLevel, PriceLevelView } from '@webpackages/gen-entity';

@Injectable()
export class PriceLevelService extends RepositoryService<PriceLevel> {
  constructor(@InjectRepository(PriceLevel) repo: Repository<PriceLevel>) {
    super(repo);
  }
}

@Injectable()
export class PriceLevelViewService extends RepositoryService<PriceLevelView> {
  constructor(
    @InjectRepository(PriceLevelView) repo: Repository<PriceLevelView>
  ) {
    super(repo);
  }
}
