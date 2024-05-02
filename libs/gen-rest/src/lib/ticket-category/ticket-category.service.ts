import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { TicketCategory, TicketCategoryView } from '@webpackages/gen-entity';

@Injectable()
export class TicketCategoryService extends RepositoryService<TicketCategory> {
  constructor(
    @InjectRepository(TicketCategory) repo: Repository<TicketCategory>
  ) {
    super(repo);
  }
}

@Injectable()
export class TicketCategoryViewService extends RepositoryService<TicketCategoryView> {
  constructor(
    @InjectRepository(TicketCategoryView) repo: Repository<TicketCategoryView>
  ) {
    super(repo);
  }
}
