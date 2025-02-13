import { EPointMarkerType } from "../../../../types/PointMarkerType";
export interface IBasePointMarkerStyleOptions {
    type: EPointMarkerType;
    width?: number;
    height?: number;
}
export declare class BasePointMarkerStyle {
    type: EPointMarkerType;
    width: number;
    height: number;
    constructor(options?: IBasePointMarkerStyleOptions);
    get isCustomPointMarker(): boolean;
}
