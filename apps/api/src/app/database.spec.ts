import {
  Column,
  DataSource,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;
}
@Entity()
class Category extends Base {}

@Entity()
class Product extends Base {
  @ManyToOne(() => Category, (c) => c.id, {
    nullable: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  category: Category;
}

describe('database', () => {
  it('should delte child', async () => {
    const ds = await new DataSource({
      type: 'better-sqlite3',
      database: './temp/db.test.sqlite',
      entities: [Product, Category],
      synchronize: true,
      dropSchema: true,
    }).initialize();

    const productRepo = ds.getRepository(Product);
    const categoryRepo = ds.getRepository(Category);

    const cat1 = await categoryRepo.save({ name: 'Cat1' });
    const cat2 = await categoryRepo.save({ name: 'Cat2' });

    const pro1 = await productRepo.save({
      name: 'pro1',
      category: { id: cat1.id },
    });

    const products = await productRepo.find();
    const categories = await categoryRepo.find();

    console.table({ products, categories });
    console.log(products[0].category);

    // await ownerRepo.delete(1);
    await categoryRepo.delete(cat1.id);

    const restCategories = await categoryRepo.find();

    const restProducts = await productRepo.find();

    console.table({ restCategories, restProducts });
    console.log(restCategories);
    console.log(restProducts[0]?.category);
  });
});
