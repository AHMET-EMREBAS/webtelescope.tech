import {
  InjectRepository,
  Module,
  OnModuleInit,
  Repository,
  TypeOrmModule,
} from '@webpackages/core';
import { ConfigModule } from '@webpackages/config';

import { AppController } from './app.controller';
import { DatabaseModule } from '@webpackages/db';
import * as AllEntities from '@webpackages/gen-entity';

const entities = Object.entries(AllEntities)
  .filter(([key, value]) => {
    if (key.includes('Dto')) {
      return false;
    }
    console.log(value);
    return true;
  })
  .map(([, value]) => value);

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [...entities],
      username: 'postgres',
      password: 'password',
      database: 'devdb',
      synchronize: true,
      dropSchema: true,
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectRepository(AllEntities.Cart)
    protected readonly cart: Repository<AllEntities.Cart>,
    @InjectRepository(AllEntities.CartView)
    protected readonly cartView: Repository<AllEntities.CartView>,
    @InjectRepository(AllEntities.Store)
    protected readonly store: Repository<AllEntities.Store>,
    @InjectRepository(AllEntities.Customer)
    protected readonly customer: Repository<AllEntities.Customer>,
    @InjectRepository(AllEntities.User)
    protected readonly user: Repository<AllEntities.User>
  ) {}

  async onModuleInit() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    const customer1 = await this.customer.save({
      username: 'customer 1',
      password: 'password',
    });
    const customer2 = await this.customer.save({
      username: 'customer 2',
      password: 'password',
    });

    const store1 = await this.store.save({
      name: 'store',
    });

    const user1 = await this.user.save({
      username: 'user1',
      password: 'password',
    });

    const user2 = await this.user.save({
      username: 'user2',
      password: 'password',
    });

    const cart = await this.cart.save([
      {
        user: user1,
        customer: customer1,
        description: 'First cart',
        store: store1,
      },
      {
        user: user2,
        customer: customer2,
        description: 'Second cart',
        store: store1,
      },
      {
        user: user1,
        customer: customer2,
        description: 'Third cart',
        store: store1,
      },
    ]);

    await this.customer.find().then(console.log);

    const carts = await this.cartView.find();

    console.log(carts);
  }
}
