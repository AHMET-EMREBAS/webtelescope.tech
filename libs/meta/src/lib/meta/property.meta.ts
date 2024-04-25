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

export type CommonProperty<T extends PropertyType, O extends string = string> = {
  type: T;
  inputType?: InputType;
  defaultValue?: DefaultValueType<T>;
  required?: boolean;
  isArray?: boolean;
  unique?: boolean;
  enums?: DefaultValueType<T>[];
  searchable?: boolean;
  description?: string;
  objectType?:O
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
  strict: boolean;
};

export type __ObjectProperty<O extends string = string> = {
  objectType: O;
};

export type __DateProperty = {
  before?: MonthDay;
  after?: MonthDay;
  inweek?: boolean;
  weekend?: boolean;
  between: [MonthDay, MonthDay];
  days?: WeekDay[];
  day: WeekDay;
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
