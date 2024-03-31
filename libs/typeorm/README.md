# typeorm

The library is built on top of typeorm column decorators to simplify the database table development by implementing a solid strategy to define columns without worring about the database type.

The library also provides a set of predefined columns like uuid, name, password, and so more. The name column, for example, is defined as unique varchar value, password column is hashed before saving, uuid column generates a uuid value. So, we do not have to rewrite the same column defination again and again.

## Example

```typescript
import { Entity, NameColumn, NumberColumn, ObjectColumn, DateColumn, OwnerRelation, OneRelation, ManyRelation } from '@webpackages/typeorm';

@Entity()
class Sample {
  @NameColumn()
  name: string;

  @UUIDColumn()
  uuid: string;

  @NumberColumn()
  num: number;

  @PasswordColumn()
  password: string;

  @ObjectColumn()
  details: Record<string, string>;

  @DateColumn()
  startDate: Date;

  @OneRelation(Category)
  category: Category;

  @ManyRelation(Tag)
  tags: Tag[];

  @OwnerRelation(Owner)
  owner: Owner;
}
```
