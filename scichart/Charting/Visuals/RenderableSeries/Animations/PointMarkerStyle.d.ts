import { BasePointMarkerStyle, IBasePointMarkerStyleOptions } from "./BasePointMarkerStyle";
export interface IPointMarkerStyleOptions extends IBasePointMarkerStyleOptions {
    strokeThickness?: number;
    stroke?: string;
    fill?: string;
}
export declare class PointMarkerStyle extends BasePointMarkerStyle {
    strokeThickness: number;
    private strokeProperty;
    private fillProperty;
    private strokeARGBProperty;
    private fillARGBProperty;
    constructor(options?: IPointMarkerStyleOptions);
    set stroke(value: string);
    get stroke(): string;
    get strokeARGB(): number;
    set fill(value: string);
    get fill(): string;
    get fillARGB(): number;
}
