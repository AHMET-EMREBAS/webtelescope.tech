import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { ProductImg } from '@webpackages/gen-entity';

@Injectable()
export class ProductImgService extends RepositoryService<ProductImg> {
  constructor(@InjectRepository(ProductImg) repo: Repository<ProductImg>) {
    super(repo);
  }
}
