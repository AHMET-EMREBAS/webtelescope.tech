import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Ticket } from '@webpackages/gen-entity';

@Injectable()
export class TicketService extends RepositoryService<Ticket> {
  constructor(@InjectRepository(Ticket) repo: Repository<Ticket>) {
    super(repo);
  }
}
