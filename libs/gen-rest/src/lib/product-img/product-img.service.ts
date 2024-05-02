import {
  InjectRepository,
  Injectable,
  Repository,
  RepositoryService,
} from '@webpackages/core';
import { ProductImg, ProductImgView } from '@webpackages/gen-entity';

@Injectable()
export class ProductImgService extends RepositoryService<ProductImg> {
  constructor(@InjectRepository(ProductImg) repo: Repository<ProductImg>) {
    super(repo);
  }
}

@Injectable()
export class ProductImgViewService extends RepositoryService<ProductImgView> {
  constructor(
    @InjectRepository(ProductImgView) repo: Repository<ProductImgView>
  ) {
    super(repo);
  }
}
