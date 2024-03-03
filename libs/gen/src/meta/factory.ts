import { EntitySchema } from './entity-schema';
import { NumberPropertySchema, StringPropertySchema } from './property-schema';
import { RelationSchema } from './relation-schema';

export class Properties {
  private constructor() {}

  static readonly NAME: Readonly<StringPropertySchema> = {
    type: 'string',
    minLength: 3,
    maxLength: 30,
  };

  static readonly EMAIL: Readonly<StringPropertySchema> = {
    type: 'string',
    format: 'email',
  };

  static readonly PHONE: Readonly<StringPropertySchema> = {
    type: 'string',
    format: 'phone',
  };

  static readonly PASSWORD: Readonly<StringPropertySchema> = {
    type: 'string',
    format: 'password',
  };

  static readonly DESCRIPTION: Readonly<StringPropertySchema> = {
    type: 'string',
    minLength: 3,
    maxLength: 400,
  };

  static readonly POSITIVE_DECIMAL: Readonly<NumberPropertySchema> = {
    type: 'number',
    min: 0,
  };

  static readonly DECIMAL: Readonly<NumberPropertySchema> = {
    type: 'number',
  };

  static readonly INTEGER: Readonly<NumberPropertySchema> = {
    type: 'number',
    isInt: true,
  };

  static readonly RATE: Readonly<NumberPropertySchema> = {
    type: 'number',
    isInt: true,
    min: 1,
    max: 5,
  };

  static readonly PERCENT: Readonly<NumberPropertySchema> = {
    type: 'number',
    isInt: true,
    min: 0,
    max: 100,
  };
}

export class Relations {
  static sub<CN extends string, PN extends string>(
    target: CN
  ): RelationSchema<CN, PN> {
    return {
      type: 'ManyToOne',
      nullable: true,
      target,
      eager: true,
      join: true,
      onDelete: 'SET NULL',
    };
  }

  static subs<CN extends string, PN extends string>(
    target: CN
  ): RelationSchema<CN, PN> {
    return {
      type: 'ManyToMany',
      nullable: true,
      target,
      eager: true,
      join: true,
      onDelete: 'SET NULL',
    };
  }

  static child<CN extends string, PN extends string>(
    target: CN
  ): RelationSchema<CN, PN> {
    return {
      type: 'OneToOne',
      target,
      nullable: true,
      join: true,
      eager: true,
      onDelete: 'SET NULL',
    };
  }

  static parent<CN extends string, PN extends string>(
    target: CN
  ): RelationSchema<CN, PN> {
    return {
      type: 'ManyToOne',
      target,
      join: true,
      onDelete: 'CASCADE',
    };
  }
}

export class Entities {
  static nameEntity<
    ClassNames extends string,
    PN extends 'name'
  >(): EntitySchema<ClassNames, PN> {
    return {
      properties: {
        name: Properties.NAME,
      },
      createDto: ['name'],
      updateDto: ['name'],
      readDto: ['name'],
      required: ['name'],
      unique: ['name'],
    } as unknown as EntitySchema<ClassNames, PN>;
  }

  static emailEntity<CN extends string, PN extends string>(
    parent: CN
  ): EntitySchema<CN, PN> {
    return this.basicChildEntity(
      parent,
      'email',
      Properties.EMAIL
    ) as EntitySchema<CN, PN>;
  }

  static phoneEntity<CN extends string, PN extends string>(
    parent: CN
  ): EntitySchema<CN, PN> {
    return this.basicChildEntity(
      parent,
      'phone',
      Properties.PHONE
    ) as EntitySchema<CN, PN>;
  }

  static basicChildEntity<CN extends string, PN extends string>(
    parentName: CN,
    childProperty: PN,
    childPropertyType: Properties
  ): EntitySchema<CN, PN> {
    return {
      properties: {
        [childProperty]: childPropertyType,
      },
      relations: {
        owner: {
          type: 'OneToOne',
          target: parentName,
          onDelete: 'CASCADE',
        },
      },
    } as unknown as EntitySchema<CN, PN>;
  }
}
