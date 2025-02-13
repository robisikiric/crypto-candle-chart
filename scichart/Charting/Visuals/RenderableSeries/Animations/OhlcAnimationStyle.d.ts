import { BaseAnimationStyle, IBaseAnimationStyleOptions } from "./BaseAnimationStyle";
export interface IOhlcAnimationStyleOptions extends IBaseAnimationStyleOptions {
    strokeUp?: string;
    strokeDown?: string;
    dataPointWidth?: number;
}
export declare class OhlcAnimationStyle extends BaseAnimationStyle {
    dataPointWidth: number;
    private strokeUpProperty;
    private strokeDownProperty;
    private strokeUpARGBProperty;
    private strokeDownARGBProperty;
    constructor(options?: IOhlcAnimationStyleOptions);
    set strokeUp(value: string);
    get strokeUp(): string;
    get strokeUpARGB(): number;
    set strokeDown(value: string);
    get strokeDown(): string;
    get strokeDownARGB(): number;
}
