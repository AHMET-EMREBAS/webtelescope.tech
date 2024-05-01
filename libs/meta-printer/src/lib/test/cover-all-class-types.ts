import { ICoverAllClassTypes } from '../common';

export class MockCoverAllClassTypes<T> implements ICoverAllClassTypes<T> {
  Entity(): T {
    return 'Entity' as T;
  }
  View(): T {
    return 'View' as T;
  }
  Create(): T {
    return 'Create' as T;
  }
  Update(): T {
    return 'Update' as T;
  }
  Query(): T {
    return 'Query' as T;
  }
  IEntity(): T {
    return 'IEntity' as T;
  }
  IView(): T {
    return 'IView' as T;
  }
  ICreate(): T {
    return 'ICreate' as T;
  }
  IUpdate(): T {
    return 'IUpdate' as T;
  }
  IQuery(): T {
    return 'IQuery' as T;
  }
}
