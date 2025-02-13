import { EAnimationType } from "../../../../types/AnimationType";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { IRenderableSeries } from "../IRenderableSeries";
import { BaseAnimationStyle } from "./BaseAnimationStyle";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
export interface IWaveAnimationOptions extends IBaseAnimationOptions {
    pointDurationFraction?: number;
    zeroLine?: number;
}
export declare class WaveAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Wave;
    /**
     * The value that specifies a relative duration of a point animation as a fraction of an overall animation
     */
    pointDurationFraction: number;
    /**
     * The line from which the animation evolves
     */
    zeroLine: number;
    constructor(options?: IWaveAnimationOptions);
    updateSeriesProperties(renderableSeries: IRenderableSeries, initialStyles: BaseAnimationStyle, animationProgress: number): void;
    /** @inheritDoc */
    calculateAnimationValues(wasmContext: TSciChart, originalValues: SCRTDoubleVector, animationValues: SCRTDoubleVector, progress: number, noZeroLine?: boolean): void;
    toJSON(): {
        type: EAnimationType;
        options: Required<Omit<IBaseAnimationOptions, never>>;
    };
}
