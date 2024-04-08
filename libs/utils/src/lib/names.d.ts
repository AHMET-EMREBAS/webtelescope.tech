/**
 * Convert className like ClassName to Class_Name
 * @param className
 * @returns
 */
export declare function splitByUppercase(className: string): string;
export type NameResult = {
    className: string;
    fileName: string;
    propertyName: string;
    constName: string;
};
export declare function names(name: string): NameResult;
