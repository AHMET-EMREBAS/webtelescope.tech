import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Sale } from '@webpackages/gen-entity';

@Injectable()
export class SaleService extends RepositoryService<Sale> {
  constructor(@InjectRepository(Sale) repo: Repository<Sale>) {
    super(repo);
  }
}
