import { EAnimationType } from "../../../../types/AnimationType";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
export interface IScaleAnimationOptions extends IBaseAnimationOptions {
    /**
     * The line from which the animation evolves
     */
    zeroLine?: number;
}
export declare class ScaleAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Scale;
    /**
     * The line from which the animation evolves
     */
    zeroLine: number;
    constructor(options?: IScaleAnimationOptions);
    /** @inheritDoc */
    calculateAnimationValues(wasmContext: TSciChart, originalValues: SCRTDoubleVector, animationValues: SCRTDoubleVector, progress: number, noZeroLine?: boolean): void;
    toJSON(): {
        type: EAnimationType;
        options: Required<Omit<IBaseAnimationOptions, never>>;
    };
}
