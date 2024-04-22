export class __Autocomplete {
  'additional-name' = '';
  'address-level1' = '';
  'address-level2' = '';
  'address-level3' = '';
  'address-level4' = '';
  'address-line1' = '';
  'address-line2' = '';
  'address-line3' = '';
  'bday-day' = '';
  'bday-month' = '';
  'bday-year' = '';
  'bday' = '';
  'billing' = '';
  'cc-additional-name' = '';
  'cc-csc' = '';
  'cc-exp-month' = '';
  'cc-exp-year' = '';
  'cc-exp' = '';
  'cc-family-name' = '';
  'cc-given-name' = '';
  'cc-name' = '';
  'cc-number' = '';
  'cc-type' = '';
  'country-name' = '';
  'country' = '';
  'current-password' = '';
  'email' = '';
  'family-name' = '';
  'fax' = '';
  'given-name' = '';
  'home' = '';
  'honorific-prefix' = '';
  'language' = '';
  'mobile' = '';
  'name' = '';
  'new-password' = '';
  'nickname' = '';
  'off' = '';
  'on' = '';
  'organization-title' = '';
  'organization' = '';
  'pager' = '';
  'photo' = '';
  'postal-code' = '';
  'sex' = '';
  'shipping' = '';
  'street-address' = '';
  'tel-area-code' = '';
  'tel-country-code' = '';
  'tel-extension' = '';
  'tel-local-prefix' = '';
  'tel-local-suffix' = '';
  'tel-local' = '';
  'tel-national' = '';
  'tel' = '';
  'url' = '';
  'username' = '';
  'work' = '';
}

export const AutocompleteList = () =>
  Object.keys(new __Autocomplete()).sort((p, c) => {
    return p > c ? 1 : -1;
  }) as (keyof __Autocomplete)[];

export type Autocomplete = keyof __Autocomplete;

export const Autocompletes: Readonly<Autocomplete[]> = AutocompleteList();
