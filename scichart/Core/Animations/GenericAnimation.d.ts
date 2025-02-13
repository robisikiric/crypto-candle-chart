import { IAnimation } from "./AnimationFiniteStateMachine";
import { TEasingFn } from "./EasingFunctions";
/**
 * Options passed to a {@link GenericAnimation} at construction time
 */
export interface IGenericAnimationOptions<T> {
    /** An identifier for the animation.  Will be set to a Guid if not specified */
    id?: string;
    /** Time in ms before the animation is started.  Animations are advanced on each frame, so this time is a minimum, not exact. */
    delay?: number;
    /** Time in ms that the animation will run for. Animations are advanced on each frame, so this time is a minimum, not exact  */
    duration?: number;
    /** An easing function used to calculate progress */
    ease?: TEasingFn | string;
    /** The initial state of the animation parameter */
    from: T;
    /** The final state of the animation parameter */
    to: T;
    /**
     * A function that is called each frame.  Update the target of the animation here. progress is between 0 and 1.
     */
    onAnimate: (from: T, to: T, progress: number) => void;
    /** When true, onAnimate is called immediately with progress=0 to set the initial value */
    setInitialValueImmediately?: boolean;
    /**
     * A function that is called after the animation has finished.
     */
    onCompleted?: () => void;
}
export interface IGenericAnimation extends IAnimation {
    readonly id: string;
    isComplete: boolean;
    reset(): void;
    update(timeElapsed: number): void;
    cancel(): void;
}
/**
 * @summary Defines Animations that can be applied directly to a {@link SciChartSurface} in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * When creating the animation, use the options to specify what to update
 */
export declare class GenericAnimation<T> implements IGenericAnimation {
    /** The initial state of the animation parameter */
    from: T;
    /** The final state of the animation parameter */
    to: T;
    get isComplete(): boolean;
    readonly id: string;
    /**
     * The animation delay
     */
    delay: number;
    /**
     * The animation duration
     */
    duration: number;
    /**
     * Sets the animation easing function
     */
    ease: TEasingFn;
    /** The function that is called each frame.  Update the target of the animation here. progress is between 0 and 1. */
    onAnimate: (from: T, to: T, progress: number) => void;
    /** The function that is called after the animation has finished. */
    onCompleted: () => void;
    private animationFSM;
    constructor(options: IGenericAnimationOptions<T>);
    /** Reset the animation to its initial state.
     * If reset while running or onCompleted, the animation will remain in the list and run again.
     */
    reset(): void;
    /** Advance the animation according to the time elapsed since the last frame */
    update(timeElapsed: number): void;
    /** Cancel the animation.  onCompleted will not be called */
    cancel(): void;
}
