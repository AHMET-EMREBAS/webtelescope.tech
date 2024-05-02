import {
  Column,
  CreateDateColumn,
  DataSource,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RepositoryService } from './repository-service';
@Entity()
class Category {
  @PrimaryGeneratedColumn() id!: number;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @DeleteDateColumn() deletedAt?: Date;

  @Column({ type: 'varchar', unique: true, nullable: true }) name!: string;
}

describe('RepositoryService', () => {
  let ds: DataSource;
  beforeAll(async () => {
    ds = await new DataSource({
      type: 'postgres',
      database: 'devdb',
      username: 'postgres',
      password: 'password',
      entities: [Category],
    }).initialize();
  });

  it('should valiate the unique fields', async () => {
    const repo = ds.getRepository(Category);

    const service = new RepositoryService(repo);
    await service.saveSafe({ name: 'name' });
    await service.saveSafe({ name: 'name' });
  });
});
