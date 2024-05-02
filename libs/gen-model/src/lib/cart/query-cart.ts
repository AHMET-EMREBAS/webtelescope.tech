export interface IQueryCartDto {
  description?: string;
  /**
   * Is chart checked out or not?
   */ checked?: boolean;
  customerUsername?: string;
  customerPassword?: string;
  userUsername?: string;
  userPassword?: string;
  storeName?: string;
}
