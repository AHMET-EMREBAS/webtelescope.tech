import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities';
import { StoreController } from './store.controller';
import { Repository } from 'typeorm';
import { PriceLevel } from '../price-level';

@Module({
  imports: [TypeOrmModule.forFeature([Store, PriceLevel])],
  controllers: [StoreController],
})
export class StoreModule implements OnModuleInit {
  constructor(
    @InjectRepository(Store) private readonly storeRepo: Repository<Store>,
    @InjectRepository(PriceLevel)
    private readonly priceLevelRepo: Repository<PriceLevel>
  ) {}

  async onModuleInit() {
    const priceLevels = ['Wholesale', 'Retail', 'VIP'];

    for (const pl of priceLevels) {
      await this.priceLevelRepo.save({ name: pl });
    }

    const stores: [string, number][] = [
      ['Wholesale Store', 1],
      ['Retail Store', 2],
      ['Sample Store', 2],
      ['Abc Store', 2],
    ];

    for (const [storeName, plID] of stores) {
      await this.storeRepo.save({ name: storeName, priceLevel: { id: plID } });
    }
  }
}
