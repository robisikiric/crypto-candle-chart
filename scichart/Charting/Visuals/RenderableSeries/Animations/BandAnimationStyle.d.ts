import { BaseAnimationStyle, IBaseAnimationStyleOptions } from "./BaseAnimationStyle";
export interface IBandAnimationStyleOptions extends IBaseAnimationStyleOptions {
    strokeY1?: string;
    fill?: string;
    fillY1?: string;
}
export declare class BandAnimationStyle extends BaseAnimationStyle {
    private strokeY1Property;
    private fillProperty;
    private fillY1Property;
    private strokeY1ARGBProperty;
    private fillARGBProperty;
    private fillY1ARGBProperty;
    constructor(options?: IBandAnimationStyleOptions);
    set strokeY1(value: string);
    get strokeY1(): string;
    get strokeY1ARGB(): number;
    set fill(value: string);
    get fill(): string;
    get fillARGB(): number;
    set fillY1(value: string);
    get fillY1(): string;
    get fillY1ARGB(): number;
}
