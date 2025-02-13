/**
 * An easing function used in animations through SciChart. See {@link easing} for a list of values
 */
export declare type TEasingFn = (time: number) => number;
/**
 * Easing functions used throughout SciChart when animations are used
 */
export interface IEasingMap {
    /**
     * No easing, no acceleration
     * @param t
     */
    linear: TEasingFn;
    /**
     * Accelerates fast, then slows quickly towards end.
     * @param t
     */
    quadratic: TEasingFn;
    /**
     * Overshoots over 1 and then returns to 1 towards end.
     * @param t
     */
    cubic: TEasingFn;
    /**
     * Overshoots over 1 multiple times - wiggles around 1.
     * @param t
     */
    elastic: TEasingFn;
    /**
     * Accelerating from zero velocity
     * @param t
     */
    inQuad: TEasingFn;
    /**
     * Decelerating to zero velocity
     * @param t
     */
    outQuad: TEasingFn;
    /**
     * Acceleration until halfway, then deceleration
     * @param t
     */
    inOutQuad: TEasingFn;
    /**
     * Accelerating from zero velocity
     * @param t
     */
    inCubic: TEasingFn;
    /**
     * Decelerating to zero velocity
     * @param t
     */
    outCubic: TEasingFn;
    /**
     * Acceleration until halfway, then deceleration
     * @param t
     */
    inOutCubic: TEasingFn;
    /**
     * Accelerating from zero velocity
     * @param t
     */
    inQuart: TEasingFn;
    /**
     * Decelerating to zero velocity
     * @param t
     */
    outQuart: TEasingFn;
    /**
     * Acceleration until halfway, then deceleration
     * @param t
     */
    inOutQuart: TEasingFn;
    /**
     * Accelerating from zero velocity
     * @param t
     */
    inQuint: TEasingFn;
    /**
     * Decelerating to zero velocity
     * @param t
     */
    outQuint: TEasingFn;
    /**
     * Acceleration until halfway, then deceleration
     * @param t
     */
    inOutQuint: TEasingFn;
    /**
     * Accelerating from zero velocity
     * @param t
     */
    inSine: TEasingFn;
    /**
     * Decelerating to zero velocity
     * @param t
     */
    outSine: TEasingFn;
    /**
     * Accelerating until halfway, then decelerating
     * @param t
     */
    inOutSine: TEasingFn;
    /**
     * Exponential accelerating from zero velocity
     * @param t
     */
    inExpo: TEasingFn;
    /**
     * Exponential decelerating to zero velocity
     * @param t
     */
    outExpo: TEasingFn;
    /**
     * Exponential accelerating until halfway, then decelerating
     * @param t
     */
    inOutExpo: TEasingFn;
    /**
     * Circular accelerating from zero velocity
     * @param t
     */
    inCirc: TEasingFn;
    /**
     * Circular decelerating to zero velocity Moves VERY fast at the beginning and
     * then quickly slows down in the middle. This tween can actually be used
     * in continuous transitions where target value changes all the time,
     * because of the very quick start, it hides the jitter between target value changes.
     */
    outCirc: TEasingFn;
    /**
     * Circular acceleration until halfway, then deceleration
     * @param t
     */
    inOutCirc: TEasingFn;
}
/**
 * Easing functions used throughout SciChart when animations are used
 */
export declare const easing: IEasingMap & Record<string, TEasingFn>;
/**
 * Reversable functions that go from 0..1..0 used throughout SciChart when animations are used
 */
export interface IReversableEasingMap {
    linear: TEasingFn;
}
/**
 * Reversable functions that go from 0..1..0 used throughout SciChart when animations are used
 */
export declare const autoReverseEasing: IReversableEasingMap;
