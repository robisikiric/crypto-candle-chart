import { EAnimationType } from "../../../../types/AnimationType";
import { XyDataSeries } from "../../../Model/XyDataSeries";
import { FastColumnRenderableSeries } from "../FastColumnRenderableSeries";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
import { ColumnAnimationStyle, IColumnAnimationStyleOptions } from "./ColumnAnimationStyle";
export interface IColumnAnimationOptions extends IBaseAnimationOptions {
    styles?: IColumnAnimationStyleOptions;
    dataSeries?: XyDataSeries;
}
export declare class ColumnAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Style;
    /** @inheritDoc */
    styles: ColumnAnimationStyle;
    /** @inheritDoc */
    dataSeries: XyDataSeries;
    constructor(options?: IColumnAnimationOptions);
    /** @inheritDoc */
    getSeriesStyle(rs: FastColumnRenderableSeries): ColumnAnimationStyle;
    /** @inheritDoc */
    updateSeriesProperties(rs: FastColumnRenderableSeries, initialStyles: ColumnAnimationStyle, animationProgress: number): void;
}
