// import {
//   InjectRepository,
//   Module,
//   OnModuleInit,
//   Repository,
//   TypeOrmModule,
// } from '@webpackages/core';
// import { ConfigModule } from '@webpackages/config';
// import * as All from '@webpackages/gen-entity';
// // import {
// //   Category,
// //   Department,
// //   PriceLevel,
// //   Store,
// //   Customer,
// //   Permission,
// //   User,
// //   Role,
// //   CartView,
// //   Cart,
// //   CategoryView,
// //   CustomerContact,
// //   CustomerContactView,
// //   // SO far so good
// //   CustomerEmail,
// //   SkuView,
// //   Product,
// //   ProductView,
// //   Sku,
// //   // So far so good
// //   UserView,
// //   Order,
// //   Price,
// // } from '@webpackages/gen-entity';

// // const entities = [
// //   Category,
// //   CategoryView,
// //   Department,
// //   PriceLevel,
// //   Store,
// //   Customer,
// //   Permission,
// //   Role,
// //   User,
// //   Cart,
// //   CartView,
// //   CustomerContact,
// //   CustomerContactView,
// //   CustomerEmail,
// //   Product,
// //   ProductView,
// //   Sku,
// //   SkuView,
// //   // So far so good
// //   Order,
// //   Price,

// //   UserView,
// //   // // OrderView,
// //   // // PriceView,
// //   // // StoreView,
// // ];
// const entities = [...Object.values(All).filter((e) => !e.name.includes('Dto'))];

// @Module({
//   imports: [
//     ConfigModule,
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       entities: [...entities],
//       username: 'postgres',
//       password: 'password',
//       database: 'devdb',
//       synchronize: true,
//       dropSchema: true,
//     }),
//     TypeOrmModule.forFeature([...entities]),
//   ],
// })
// export class AppModule implements OnModuleInit {
//   constructor(
//     @InjectRepository(All.Cart)
//     protected readonly cart: Repository<All.Cart>,
//     @InjectRepository(All.CartView)
//     protected readonly cartView: Repository<All.CartView>,
//     @InjectRepository(All.Store)
//     protected readonly store: Repository<All.Store>,
//     @InjectRepository(All.Customer)
//     protected readonly customer: Repository<All.Customer>,
//     @InjectRepository(All.User)
//     protected readonly user: Repository<All.User>
//   ) {}

//   async onModuleInit() {
//     const uniqueColumns = this.customer.metadata.ownUniques
//       .map((e) => e.givenColumnNames)
//       .flat();

//     console.log(uniqueColumns);

//     const customer1 = await this.customer.save({
//       username: 'customer 1',
//       password: 'password',
//     });
//     const customer2 = await this.customer.save({
//       username: 'customer 2',
//       password: 'password',
//     });
//     const store1 = await this.store.save({
//       name: 'store',
//     });
//     const user1 = await this.user.save({
//       username: 'user1',
//       password: 'password',
//     });
//     const user2 = await this.user.save({
//       username: 'user2',
//       password: 'password',
//     });
//     const cart = await this.cart.save([
//       {
//         user: user1,
//         customer: customer1,
//         description: 'First cart',
//         store: store1,
//       },
//       {
//         user: user2,
//         customer: customer2,
//         description: 'Second cart',
//         store: store1,
//       },
//       {
//         user: user1,
//         customer: customer2,
//         description: 'Third cart',
//         store: store1,
//       },
//     ]);
//     await this.customer.find().then(console.log);
//     const carts = await this.cartView.find();
//     // console.log(carts);
//   }
// }
