import { EAnimationType } from "../../../../types/AnimationType";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { IRenderableSeries } from "../IRenderableSeries";
import { BaseAnimationStyle } from "./BaseAnimationStyle";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
export interface ISweepAnimationOptions extends IBaseAnimationOptions {
}
export declare class SweepAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Sweep;
    constructor(options?: ISweepAnimationOptions);
    updateSeriesProperties(renderableSeries: IRenderableSeries, initialStyles: BaseAnimationStyle, animationProgress: number): void;
    /** @inheritDoc */
    calculateAnimationValues(wasmContext: TSciChart, originalValues: SCRTDoubleVector, animationValues: SCRTDoubleVector, progress: number, noZeroLine?: boolean): void;
}
