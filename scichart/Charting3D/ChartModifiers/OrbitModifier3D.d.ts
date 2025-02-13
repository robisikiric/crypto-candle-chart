import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { EChart3DModifierType } from "../../types/ChartModifierType";
import { IPinchZoomModifier3DOptions, PinchZoomModifier3D } from "./PinchZoomModifier3D";
/**
 * Optional parameters passed to the constructor of {@link OrbitModifier3D} to configure it
 */
export interface IOrbitModifier3DOptions extends IPinchZoomModifier3DOptions {
    /**
     * Sets whether to enable pinch zoom behavior of {@link SciChartSurface} on touchscreen devices
     */
    enableZoom?: boolean;
}
/**
 * @summary The {@link OrbitModifier3D} provides behavior to orbit around a target point on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link OrbitModifier3D} to a {@link SciChart3DSurface} and add orbit on mouse-drag behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new OrbitModifier3D());
 * ```
 */
export declare class OrbitModifier3D extends PinchZoomModifier3D {
    /**
     * @inheritDoc
     */
    readonly type = EChart3DModifierType.Orbit;
    /**
     * Sets whether to enable pinch zoom behavior of {@link SciChartSurface} on touchscreen devices
     */
    enableZoom: boolean;
    constructor(options?: IOrbitModifier3DOptions);
    /**
     * @inheritDoc
     */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseUp(args: ModifierMouseArgs): void;
    toJSON(): {
        type: string;
        options: Required<Omit<import("./ChartModifierBase3D").IChartModifierBase3DOptions, never>>;
    };
    protected performModifierAction(args: ModifierMouseArgs): void;
    protected getIsActionAllowed(args: ModifierMouseArgs): boolean;
}
