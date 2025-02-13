import { EAnimationType } from "../../../../types/AnimationType";
import { XyDataSeries } from "../../../Model/XyDataSeries";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
import { IBaseAnimationStyleOptions } from "./BaseAnimationStyle";
export interface IScatterAnimationOptions extends IBaseAnimationOptions {
    styles?: IBaseAnimationStyleOptions;
    dataSeries?: XyDataSeries;
}
export declare class ScatterAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    dataSeries: XyDataSeries;
    constructor(options?: IScatterAnimationOptions);
}
