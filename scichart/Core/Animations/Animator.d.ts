import { AnimationToken } from "../AnimationToken";
import { TEasingFn } from "./EasingFunctions";
/**
 * @deprecated Instead create an {@link GenericAnimation} and pass it to sciChartSurface.addAnimation
 */
export declare function animateAny<T>(durationMs: number, from: T, to: T, onAnimate: (intermediateValue: T) => void, interpolate: (start: T, end: T, interpolationFactor: number) => T, onCompleted: () => void, easingFn: TEasingFn): AnimationToken;
