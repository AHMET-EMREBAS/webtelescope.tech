import { Subject } from 'rxjs';
/**
 * Temporarily hold the value for miliseconds ( 400ms by default ), then set undefiend after the time passed,
 * You do not need to deal with subscription and unsubscription.
 */
export declare class TempValue<T = string> {
    private readonly delay;
    private handlers;
    private sub;
    private closing;
    $value: Subject<T | undefined>;
    private $stoper;
    constructor(delay?: number, handler?: (value: T | undefined) => void);
    next(value: T): void;
    unsubscribe(): void;
}
