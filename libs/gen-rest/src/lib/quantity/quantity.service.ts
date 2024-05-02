import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { Quantity } from '@webpackages/gen-entity';

@Injectable()
export class QuantityService extends RepositoryService<Quantity> {
  constructor(@InjectRepository(Quantity) repo: Repository<Quantity>) {
    super(repo);
  }
}
