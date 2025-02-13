import { EAnimationType } from "../../../../types/AnimationType";
import { XyDataSeries } from "../../../Model/XyDataSeries";
import { BaseMountainRenderableSeries } from "../BaseMountainRenderableSeries";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
import { IMountainAnimationStyleOptions, MountainAnimationStyle } from "./MountainAnimationStyle";
export interface IMountainAnimationOptions extends IBaseAnimationOptions {
    styles?: IMountainAnimationStyleOptions;
    dataSeries?: XyDataSeries;
}
export declare class MountainAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    styles: MountainAnimationStyle;
    /** @inheritDoc */
    dataSeries: XyDataSeries;
    constructor(options?: IMountainAnimationOptions);
    /** @inheritDoc */
    getSeriesStyle(rs: BaseMountainRenderableSeries): MountainAnimationStyle;
    /** @inheritDoc */
    updateSeriesProperties(rs: BaseMountainRenderableSeries, initialStyles: MountainAnimationStyle, animationProgress: number): void;
}
