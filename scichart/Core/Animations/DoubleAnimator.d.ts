import { AnimationToken } from "../AnimationToken";
import { TEasingFn } from "./EasingFunctions";
/**
 * A class for animating a double-precision (number) value
 */
export declare class DoubleAnimator {
    /**
     * @deprecated Instead create an {@link GenericAnimation} and pass it to sciChartSurface.addAnimation
     */
    static animate(from: number, to: number, durationMs: number, onAnimate: (value: number) => void, onCompleted: () => void, easingFunction?: TEasingFn): AnimationToken;
    static interpolate(from: number, to: number, interpolationFactor: number): number;
}
