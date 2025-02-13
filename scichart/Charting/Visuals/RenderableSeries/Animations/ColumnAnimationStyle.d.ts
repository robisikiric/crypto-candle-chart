import { BaseAnimationStyle, IBaseAnimationStyleOptions } from "./BaseAnimationStyle";
export interface IColumnAnimationStyleOptions extends IBaseAnimationStyleOptions {
    fill?: string;
    zeroLineY?: number;
    dataPointWidth?: number;
}
export declare class ColumnAnimationStyle extends BaseAnimationStyle {
    dataPointWidth: number;
    zeroLineY: number;
    private fillProperty;
    private fillARGBProperty;
    constructor(options?: IColumnAnimationStyleOptions);
    set fill(value: string);
    get fill(): string;
    get fillARGB(): number;
}
