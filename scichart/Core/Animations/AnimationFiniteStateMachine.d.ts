import { BaseAnimationStyle } from "../../Charting/Visuals/RenderableSeries/Animations/BaseAnimationStyle";
import { SeriesAnimation } from "../../Charting/Visuals/RenderableSeries/Animations/SeriesAnimation";
import { IRenderableSeries } from "../../Charting/Visuals/RenderableSeries/IRenderableSeries";
import { TEasingFn } from "./EasingFunctions";
export declare enum EAnimationState {
    InitialState = "InitialState",
    Delayed = "Delayed",
    Running = "Running",
    Completed = "Completed"
}
export declare enum EAnimationStateTransition {
    NoChange = "NoChange",
    InitialState_Delayed = "InitialState_Delayed",
    InitialState_Running = "InitialState_Running",
    InitialState_Completed = "InitialState_Completed",
    Delayed_Running = "Delayed_Running",
    Running_Completed = "Running_Completed"
}
export interface IAnimation {
    delay: number;
    duration: number;
    ease: TEasingFn;
}
export declare class AnimationFiniteStateMachine {
    protected readonly animationProperty: IAnimation;
    protected stateProperty: EAnimationState;
    protected animationDelayStartTimestamp: number;
    protected animationDelayElapsed: number;
    protected animationStartTimestamp: number;
    protected animationElapsed: number;
    constructor(animation: IAnimation);
    /**
     * Gets the current state
     */
    get state(): EAnimationState;
    /**
     * Gets the animation property
     */
    get animation(): IAnimation;
    /**
     * Checks the current state
     * @param states
     */
    is(states: EAnimationState[]): boolean;
    /**
     * Updates the state
     * @param timeElapsed
     */
    update(timeElapsed: number): EAnimationStateTransition;
    /**
     * Gets the animation progress, the value from 0 to 1
     */
    get animationProgress(): number;
    /**
     * Changes the state to Completed
     */
    toCompleted(): void;
    private validate;
    private toDelayed;
    private toRunning;
    private updateDelayedState;
    private updateRunningState;
}
export declare class SeriesAnimationFiniteStateMachine extends AnimationFiniteStateMachine {
    private readonly initialStylesProperty;
    constructor(animation: SeriesAnimation, renderableSeries: IRenderableSeries);
    /**
     * Gets the animation property
     */
    get animation(): SeriesAnimation;
    /**
     * Gets the initial styles for the animation
     */
    get initialStyles(): BaseAnimationStyle;
}
