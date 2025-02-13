import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { TEasingFn } from "../../Core/Animations/EasingFunctions";
import { EChart3DModifierType } from "../../types/ChartModifierType";
import { ChartModifierBase3D, IChartModifierBase3DOptions } from "./ChartModifierBase3D";
/**
 * Optional parameters passed to the constructor of {@link ResetCamera3DModifier} to configure it
 */
export interface IResetCamera3DOptions extends IChartModifierBase3DOptions {
    /**
     * When true, the Zoom operations are animated. See also {@link animationDuration} and {@link easingFunction}
     */
    isAnimated?: boolean;
    /**
     * Defines the duration of animations when zooming in milliseconds
     */
    animationDuration?: number;
    /**
     * Defines the easing function for animation. See {@link TEasingFn} for a range of functions
     */
    easingFunction?: TEasingFn | string;
    /**
     * The camera settings to reset to.  Defaults to the camera state when the modifier was attached to the chart.
     */
    destination?: TCameraState;
}
export declare type TCameraState = {
    radius?: number;
    pitch?: number;
    yaw?: number;
    width?: number;
    height?: number;
};
/**
 * @summary The {@link ResetCamera3DModifier} provides double click to zoom to extents behavior on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link ResetCamera3DModifier} to a {@link SciChart3DSurface} and add Mouse-wheel zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new ResetCamera3DModifier());
 * ```
 *
 */
export declare class ResetCamera3DModifier extends ChartModifierBase3D {
    /**
     * @inheritDoc
     */
    readonly type = EChart3DModifierType.ZoomExtents;
    /**
     * When true, the Zoom operations are animated. See also {@link animationDuration} and {@link easingFunction}
     */
    isAnimated: boolean;
    /**
     * Defines the duration of animations when zooming in milliseconds
     */
    animationDuration: number;
    /**
     * Defines the easing function for animation. See {@link TEasingFn} for a range of functions
     */
    easingFunction: TEasingFn;
    destination: TCameraState;
    /**
     * Creates an instance of the {@link ResetCamera3DModifier}
     * @param options optional parameters of type {@link IResetCamera3DOptions} used to configure the modifier
     */
    constructor(options?: IResetCamera3DOptions);
    onAttach(): void;
    /**
     * @inheritDoc
     */
    modifierDoubleClick(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBase3DOptions, never>>;
    };
}
