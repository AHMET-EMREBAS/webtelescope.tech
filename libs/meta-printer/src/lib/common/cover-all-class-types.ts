export interface ICoverAllClassTypes<T> {
  Entity(): T;
  View(): T;
  Create(): T;
  Update(): T;
  Query(): T;
  IEntity(): T;
  IView(): T;
  ICreate(): T;
  IUpdate(): T;
  IQuery(): T;
}
