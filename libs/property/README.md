# Property

The property library is built on top of **class-validator**, **class-transformer**, and **swagger** libraries to ease the development of data transfer objects.

The library provides predefined property decorators. Each decorator's options is added to **swagger** document by default. So, we do not have to use multiple decorators to properties.

The library also provides support for query params which are generally string values. The number property decorator, for example, checks the provided value is number or number-string, then transform it into number value and validate it. So, you do not have to worry about transforming string values to the related type.

## Examples

Let's create a sample **data-transfer-object**

```typescript
import { StringProperty, NumberProperty, DateProperty, ObjectProperty, BooleanProperty } from '@webpackages/property';
import { Exclude } from 'class-transformer';

@Exclude()
class SampleDto {
  @StringProperty({ required: true, minLength: 3, maxLength: 30, defaultValue: 'Default Value' })
  text!: string;

  @NumberProperty({ required: true, minimum: 1, maximum: 400, defaultValue: 1 })
  num!: number;

  @DateProperty({ required: true, defaultValue: new Date() })
  startDate: Date;

  @BooleanProperty()
  active: boolean;

  @ObjectProperty({ objectType: SampleDto })
  child: SampleDto;
}
```
