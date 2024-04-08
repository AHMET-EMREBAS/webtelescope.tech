export declare class Context<T> {
    private readonly map;
    private readonly modulesMap;
    value<K extends keyof T>(key: K, value?: T[K]): T[K];
    module(profile: string, mdl: any): void;
    modules(profile: string): any[];
}
