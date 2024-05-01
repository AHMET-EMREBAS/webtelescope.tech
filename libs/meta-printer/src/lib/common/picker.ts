export interface IPickBy<N, T> {
  Pick(type: N): T;
}

export interface IGetPicker<T> {
  getPicker(): T;
}

