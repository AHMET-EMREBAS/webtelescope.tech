/* eslint-disable @nx/enforce-module-boundaries */
import { Observable, of } from 'rxjs';

export type AutocompleteOption = {
  id: number;
  name: string;
};

export class AutoCompleteService {
  data = [
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
    { id: 3, name: 'Third' },
    { id: 4, name: 'Forth' },
    { id: 5, name: 'Fifth' },
  ];
  getWithQuery(queryParams: {
    search: string;
  }): Observable<AutocompleteOption[]> {
    return of(
      this.data.filter((e) => {
        if (queryParams.search) {
          return e.name
            .toLowerCase()
            .includes(queryParams.search.toLowerCase());
        }
        return true;
      })
    );
  }
}
