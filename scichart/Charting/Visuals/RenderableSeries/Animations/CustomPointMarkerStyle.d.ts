import { BasePointMarkerStyle, IBasePointMarkerStyleOptions } from "./BasePointMarkerStyle";
export interface ICustomPointMarkerStyleOptions extends IBasePointMarkerStyleOptions {
    image?: HTMLImageElement;
}
export declare class CustomPointMarkerStyle extends BasePointMarkerStyle {
    image: HTMLImageElement;
    constructor(options?: ICustomPointMarkerStyleOptions);
}
