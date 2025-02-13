import { NumberRange } from "../NumberRange";
import { TEasingFn } from "./EasingFunctions";
import { GenericAnimation } from "./GenericAnimation";
/**
 * A class for animating a value of type {@link NumberRange}. Used throughout SciChart to animate
 * {@link AxisCore.visibleRange} when zooming or panning.
 */
export declare class NumberRangeAnimator {
    /**
     * Animates a {@link NumberRange} with a start, to value over a specified duration and with an optional completed and easing function
     * @param from The start value to animate
     * @param to The end value to animate
     * @param durationMs The duration of the animation in milliseconds
     * @param onAnimate A callback function which is called with intermediate values
     * @param onCompleted A callback function which is called when the animation completes
     * @param easingFunction An optional easing function. See {@link IEasingMap} for a list of values
     */
    static animate(from: NumberRange, to: NumberRange, durationMs: number, onAnimate: (value: NumberRange) => void, onCompleted: () => void, easingFunction?: TEasingFn, isLog?: boolean): GenericAnimation<NumberRange>;
    static interpolate(from: NumberRange, to: NumberRange, interpolationFactor: number): NumberRange;
    static interpolateLog(from: NumberRange, to: NumberRange, interpolationFactor: number): NumberRange;
}
