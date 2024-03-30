/* eslint-disable @typescript-eslint/no-explicit-any */
export type CommonPropertyOptions<DF = any> = {
  isArray?: boolean;
  required?: boolean;
  defaultValue?: DF;
};
