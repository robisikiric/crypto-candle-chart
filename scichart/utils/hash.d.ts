export declare const hashUtils: {
    generateHash: (s: string) => number;
    generateObjectHash: (obj: any) => number;
    generateBooleanHash: (value: boolean) => number;
    generateNumberHash: (value: number) => number;
    generateCombinedHash: (hashes: number[]) => number;
};
