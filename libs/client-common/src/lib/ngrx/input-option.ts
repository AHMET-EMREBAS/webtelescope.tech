export type InputOption = {
  type: string;

  inputName: string;
  label?: string;
  enums?: (string | number)[];
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  autocomplete?: HTMLInputElement['autocomplete'];
  required?: boolean;
  icon?: string;
};
