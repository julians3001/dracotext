declare class Strings {
    constructor(language?: string);
    get(key: string): string;
    getCreature(key: string): string;
    getItem(key: string): string;
}

export declare function load(language?: string): Strings;
