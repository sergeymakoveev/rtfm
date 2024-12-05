export declare type PartialKeys<T extends {}, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export {};
