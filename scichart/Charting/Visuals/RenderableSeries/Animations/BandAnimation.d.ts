import { EAnimationType } from "../../../../types/AnimationType";
import { XyyDataSeries } from "../../../Model/XyyDataSeries";
import { BaseBandRenderableSeries } from "../BaseBandRenderableSeries";
import { BandAnimationStyle, IBandAnimationStyleOptions } from "./BandAnimationStyle";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
export interface IBandAnimationOptions extends IBaseAnimationOptions {
    styles?: IBandAnimationStyleOptions;
    dataSeries?: XyyDataSeries;
}
export declare class BandAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    styles: BandAnimationStyle;
    /** @inheritDoc */
    dataSeries: XyyDataSeries;
    constructor(options?: IBandAnimationOptions);
    /** @inheritDoc */
    getSeriesStyle(rs: BaseBandRenderableSeries): BandAnimationStyle;
    /** @inheritDoc */
    updateSeriesProperties(renderableSeries: BaseBandRenderableSeries, initialStyles: BandAnimationStyle, animationProgress: number): void;
}
