/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResourceService } from '../../api';

export type AutocompleteOption = {
  id: number;
  name: string;
};

export class AutoCompleteService extends ResourceService<any> {}
