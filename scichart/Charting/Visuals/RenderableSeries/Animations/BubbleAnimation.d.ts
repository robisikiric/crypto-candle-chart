import { EAnimationType } from "../../../../types/AnimationType";
import { XyzDataSeries } from "../../../Model/XyzDataSeries";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
import { IBaseAnimationStyleOptions } from "./BaseAnimationStyle";
export interface IBubbleAnimationOptions extends IBaseAnimationOptions {
    styles?: IBaseAnimationStyleOptions;
    dataSeries?: XyzDataSeries;
}
export declare class BubbleAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    dataSeries: XyzDataSeries;
    constructor(options?: IBubbleAnimationOptions);
}
