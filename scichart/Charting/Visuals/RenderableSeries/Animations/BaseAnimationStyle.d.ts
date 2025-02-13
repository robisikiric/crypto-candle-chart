import { BasePointMarkerStyle } from "./BasePointMarkerStyle";
import { ICustomPointMarkerStyleOptions } from "./CustomPointMarkerStyle";
import { IPointMarkerStyleOptions } from "./PointMarkerStyle";
export interface IBaseAnimationStyleOptions {
    strokeThickness?: number;
    stroke?: string;
    pointMarker?: IPointMarkerStyleOptions | ICustomPointMarkerStyleOptions;
    opacity?: number;
}
export declare class BaseAnimationStyle {
    strokeThickness: number;
    pointMarker: BasePointMarkerStyle;
    opacity: number;
    private strokeProperty;
    private strokeARGBProperty;
    constructor(options?: IBaseAnimationStyleOptions);
    set stroke(value: string);
    get stroke(): string;
    get strokeARGB(): number;
}
