/* eslint-disable @typescript-eslint/no-explicit-any */
export type InputOptions = {
  /**
   * Entity id or object property name
   */
  id: any;
  label: any;
  icon?: string;
  value?: any;
  children?: InputOptions[];
};
