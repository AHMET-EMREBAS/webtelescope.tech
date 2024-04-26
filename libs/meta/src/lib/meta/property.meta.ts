export type InputType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'select'
  | 'select-many'
  | 'checkbox'
  | 'slider-toggle'
  | 'autocomplete'
  | 'checkbox-group'
  | 'radio';

export type StringFormat<E = 'none'> = 'email' | 'password' | E;

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Week = 0 | 1 | 2 | 3;
export type MonthDay =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

type TString = 'string';
type TNumber = 'number';
type TBoolean = 'boolean';
type TObject = 'object';
type TDate = 'date';

export enum PropertyTypeName {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  DATE = 'date',
}

export type PropertyType = TString | TNumber | TBoolean | TObject | TDate;

export type PrimitiveType = string | number | boolean | Date;

export type OrType<T extends PropertyType, E, R, O> = T extends E ? R : O;

export type DefaultValueType<T extends PropertyType> = OrType<
  T,
  TString,
  string,
  OrType<
    T,
    TNumber,
    number,
    OrType<T, TBoolean, boolean, OrType<T, TDate, Date, unknown>>
  >
>;

export type CommonProperty<
  T extends PropertyType,
  O extends string = string
> = {
  /**
   * Property type
   */
  type: T;

  /**
   * UI input element
   */
  inputType?: InputType;

  /**
   * Default value
   */
  defaultValue?: DefaultValueType<T>;

  required?: boolean;
  isArray?: boolean;
  unique?: boolean;

  /**
   * Limit input to a list of items
   */
  enums?: DefaultValueType<T>[];

  /**
   * If set true, this property will be included in the query object
   */
  searchable?: boolean;

  description?: string;

  /**
   * In case property is an object type, the name of the object type
   */
  objectType?: O;

  /**
   * By default, all properties are included in entity views. Set false if you want to exclude this property from view.
   */
  excludeFromView?: boolean;
};

export type CommonWrapper<P, T extends PropertyType> = P & CommonProperty<T>;

export type __StringProperty<F> = {
  minLength: number;
  maxLength: number;
  format: F;
};

export type __NumberProperty = {
  minimum: number;
  maximum: number;
};

export type __BooleanProperty = {
  /**
   * Ignore his configuration, it does not have any affect.
   */
  strict?: boolean;
};

export type __ObjectProperty<O extends string = string> = {
  /**
   * Name of the object type
   */
  objectType: O;
};

export type __DateProperty = {
  /**
   * A day of month
   */
  before?: MonthDay;
  /**
   * A day of month
   */
  after?: MonthDay;

  /**
   * Find date if it is inweek
   */
  inweek?: boolean;
  /**
   * Find date if it is weekend
   */
  weekend?: boolean;
  /**
   * Find date if it is between two month days
   */
  between: [MonthDay, MonthDay];

  /**
   * Find date if it is in the list of week days
   */
  days?: WeekDay[];

  /**
   * Find date if it is the week day
   */
  day: WeekDay;

  /**
   * Find date if it is in the list of month days.
   */
  monthdays?: MonthDay[];
};

export type StringProperty<F = 'None'> = CommonWrapper<
  __StringProperty<StringFormat<F>>,
  'string'
>;
export type NumberProperty = CommonWrapper<__NumberProperty, 'number'>;
export type BooleanProperty = CommonWrapper<__BooleanProperty, 'boolean'>;
export type DateProperty = CommonWrapper<__DateProperty, 'date'>;
export type ObjectProperty<O extends string = string> = CommonWrapper<
  __ObjectProperty<O>,
  'object'
>;

export type PropertyOptions<
  ST extends string = string,
  Obj extends string = string
> =
  | Partial<StringProperty<ST>>
  | Partial<NumberProperty>
  | Partial<BooleanProperty>
  | Partial<DateProperty>
  | Partial<ObjectProperty<Obj>>;

// export type PropertyOptions = Partial<__PropertyOptions>;
