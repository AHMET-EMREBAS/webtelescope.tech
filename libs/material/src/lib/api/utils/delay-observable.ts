import { Observable, delay, of, switchMap } from 'rxjs';

export function delayObservable<T>(obserbable: Observable<T>, duration: number) {
  return of('').pipe(
    delay(duration),
    switchMap(() => obserbable)
  );
}
