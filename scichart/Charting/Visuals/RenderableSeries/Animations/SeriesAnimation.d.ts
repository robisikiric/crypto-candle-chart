import { IAnimation } from "../../../../Core/Animations/AnimationFiniteStateMachine";
import { TEasingFn } from "../../../../Core/Animations/EasingFunctions";
import { EAnimationType } from "../../../../types/AnimationType";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { IDataSeries } from "../../../Model/IDataSeries";
import { IRenderableSeries } from "../IRenderableSeries";
import { BaseAnimationStyle } from "./BaseAnimationStyle";
export interface IBaseAnimationOptions {
    /**
     * The animation delay in ms
     */
    delay?: number;
    /**
     * The animation duration in ms
     */
    duration?: number;
    /**
     * Enables fade effect for the animation
     */
    fadeEffect?: boolean;
    /**
     * Sets the animation easing function
     */
    ease?: TEasingFn | string;
    /**
     * Set true to make this scale down to the zeroline
     */
    reverse?: boolean;
    /**
     * A function that is called after the animation has finished, or the name of a registered function
     */
    onCompleted?: (() => void) | string;
}
/**
 * @summary Defines the base class for Renderable Series Animations in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * An Animation defines the animation that should take place on the start up e.g. as a Wave, Sweep, Fade animation etc...
 */
export declare abstract class SeriesAnimation implements IAnimation {
    /**
     * Returns the type of the animation. See {@link EAnimationType} for a list of values
     */
    abstract readonly type: EAnimationType;
    /**
     * The animation delay in ms
     */
    delay: number;
    /**
     * The animation duration in ms
     */
    duration: number;
    /**
     * Sets the animation easing function
     */
    ease: TEasingFn;
    /**
     * Set true to reverse the animation
     */
    reverse: boolean;
    /**
     * Enables fade effect animation
     */
    isFadeEffectAnimation: boolean;
    /**
     * Enables the animation for the effects like Wave, Sweep etc.
     */
    isOnStartAnimation: boolean;
    /**
     * Styles of the {@link IRenderableSeries} to be animated
     */
    styles: BaseAnimationStyle;
    /**
     * The {@link IDataSeries} to be used for the animation
     */
    dataSeries: IDataSeries;
    isComplete: true;
    /**
     * A function that is called after the animation has finished.
     */
    onCompleted?: () => void;
    protected typeMap: Map<string, string>;
    protected constructor(options: IBaseAnimationOptions);
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    toJSON(): {
        type: EAnimationType;
        options: Required<Omit<IBaseAnimationOptions, never>>;
    };
    /**
     * Runs on start up animation to update animation vectors
     * @param wasmContext
     * @param originalValues - original values
     * @param animationValues - calculated values used for the animation
     * @param progress Current animation progress
     * @param noZeroLine Sets zeroLine = 0, is used for XyzDataSeries
     */
    calculateAnimationValues(wasmContext: TSciChart, originalValues: SCRTDoubleVector, animationValues: SCRTDoubleVector, progress: number, noZeroLine?: boolean): void;
    /**
     * Runs for data animation to update animation vectors
     * @param wasmContext
     * @param initialValues The initial vector
     * @param finalValues The final vector
     * @param interpolatedValues The vector which will be updated with interpolated values
     * @param progress Current animation progress
     */
    calculateDataSeriesAnimationValues(wasmContext: TSciChart, initialValues: SCRTDoubleVector, finalValues: SCRTDoubleVector, interpolatedValues: SCRTDoubleVector, progress: number): void;
    /**
     * Returns {@link BaseAnimationStyle} object which is being used to create initial styles
     * @param renderableSeries The renderable series
     */
    getSeriesStyle(renderableSeries: IRenderableSeries): BaseAnimationStyle;
    /**
     * Updates properties of {@link IRenderableSeries}
     * @param renderableSeries The renderable series to be animated
     * @param initialStyles The initial styles
     * @param animationProgress The animation progress, should be between 0 and 1
     */
    updateSeriesProperties(renderableSeries: IRenderableSeries, initialStyles: BaseAnimationStyle, animationProgress: number): void;
    /**
     * Return flag if it is styles animation
     */
    get isStyleAnimation(): boolean;
    /**
     * Return flag if it is dataSeries animation
     */
    get isDataSeriesAnimation(): boolean;
}
