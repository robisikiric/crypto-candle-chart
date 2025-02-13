import { EAnimationType } from "../../../../types/AnimationType";
import { OhlcDataSeries } from "../../../Model/OhlcDataSeries";
import { BaseOhlcRenderableSeries } from "../BaseOhlcRenderableSeries";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
import { IOhlcAnimationStyleOptions, OhlcAnimationStyle } from "./OhlcAnimationStyle";
export interface IOhlcAnimationOptions extends IBaseAnimationOptions {
    styles?: IOhlcAnimationStyleOptions;
    dataSeries?: OhlcDataSeries;
}
export declare class OhlcAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    styles: OhlcAnimationStyle;
    /** @inheritDoc */
    dataSeries: OhlcDataSeries;
    constructor(options?: IOhlcAnimationOptions);
    /** @inheritDoc */
    getSeriesStyle(rs: BaseOhlcRenderableSeries): OhlcAnimationStyle;
    /** @inheritDoc */
    updateSeriesProperties(rs: BaseOhlcRenderableSeries, initialStyles: OhlcAnimationStyle, animationProgress: number): void;
}
