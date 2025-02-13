import { EAnimationType } from "../../../../types/AnimationType";
import { OhlcDataSeries } from "../../../Model/OhlcDataSeries";
import { FastCandlestickRenderableSeries } from "../FastCandlestickRenderableSeries";
import { IBaseAnimationOptions } from "./SeriesAnimation";
import { CandlestickAnimationStyle, ICandlestickAnimationStyleOptions } from "./CandlestickAnimationStyle";
import { OhlcAnimation } from "./OhlcAnimation";
export interface ICandlestickAnimationOptions extends IBaseAnimationOptions {
    styles?: ICandlestickAnimationStyleOptions;
    dataSeries?: OhlcDataSeries;
}
export declare class CandlestickAnimation extends OhlcAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    styles: CandlestickAnimationStyle;
    /** @inheritDoc */
    dataSeries: OhlcDataSeries;
    constructor(options?: ICandlestickAnimationOptions);
    /** @inheritDoc */
    getSeriesStyle(rs: FastCandlestickRenderableSeries): CandlestickAnimationStyle;
    /** @inheritDoc */
    updateSeriesProperties(renderableSeries: FastCandlestickRenderableSeries, initialStyles: CandlestickAnimationStyle, animationProgress: number): void;
}
