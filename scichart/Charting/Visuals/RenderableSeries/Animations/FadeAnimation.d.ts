import { EAnimationType } from "../../../../types/AnimationType";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { SeriesAnimation, IBaseAnimationOptions } from "./SeriesAnimation";
export interface IFadeAnimationOptions extends IBaseAnimationOptions {
}
export declare class FadeAnimation extends SeriesAnimation {
    /** @inheritDoc */
    readonly type = EAnimationType.Fade;
    constructor(options?: IFadeAnimationOptions);
    /** @inheritDoc */
    calculateAnimationValues(wasmContext: TSciChart, originalValues: SCRTDoubleVector, animationValues: SCRTDoubleVector, progress: number, noZeroLine?: boolean): void;
}
