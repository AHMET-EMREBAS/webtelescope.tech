export class __InputType {
  'checkbox' = '';
  'color' = '';
  'date' = '';
  'datetime-local' = '';
  'datetime' = '';
  'email' = '';
  'file' = '';
  'hidden' = '';
  'image' = '';
  'month' = '';
  'number' = '';
  'password' = '';
  'radio' = '';
  'range' = '';
  'reset' = '';
  'search' = '';
  'submit' = '';
  'tel' = '';
  'text' = '';
  'time' = '';
  'url' = '';
  'week' = '';
}

export type InputType = keyof __InputType;

export const InputTypeList = () =>
  Object.keys(new __InputType()).sort((a, b) => (a > b ? 1 : -1)) as Readonly<
    InputType[]
  >;

export const InputTypes = InputTypeList();
