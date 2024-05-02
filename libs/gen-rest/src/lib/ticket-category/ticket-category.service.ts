import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { TicketCategory } from '@webpackages/gen-entity';

@Injectable()
export class TicketCategoryService extends RepositoryService<TicketCategory> {
  constructor(
    @InjectRepository(TicketCategory) repo: Repository<TicketCategory>
  ) {
    super(repo);
  }
}
