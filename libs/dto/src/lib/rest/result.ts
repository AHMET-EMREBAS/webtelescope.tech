import { ICount } from '@webpackages/model';
import { Dto, NumberProperty, ObjectProperty } from '@webpackages/property';
import {
  ObjectLiteral,
  UpdateResult as RUpdate,
  DeleteResult as RDelete,
} from 'typeorm';

@Dto()
export class UpdateResult implements RUpdate {
  @NumberProperty() affected?: number | undefined;
  @ObjectProperty() generatedMaps!: ObjectLiteral[];
  @ObjectProperty() raw: unknown;
}

@Dto()
export class DeleteResult implements RDelete {
  @ObjectProperty() raw: unknown;
  @NumberProperty() affected?: number | null | undefined;
}

@Dto()
export class CountResult implements ICount {
  @NumberProperty() count!: number;
}
