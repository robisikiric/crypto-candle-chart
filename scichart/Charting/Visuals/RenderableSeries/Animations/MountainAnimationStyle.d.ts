import { BaseAnimationStyle, IBaseAnimationStyleOptions } from "./BaseAnimationStyle";
export interface IMountainAnimationStyleOptions extends IBaseAnimationStyleOptions {
    fill?: string;
    zeroLineY?: number;
}
export declare class MountainAnimationStyle extends BaseAnimationStyle {
    zeroLineY: number;
    private fillProperty;
    private fillARGBProperty;
    constructor(options?: IMountainAnimationStyleOptions);
    set fill(value: string);
    get fill(): string;
    get fillARGB(): number;
}
