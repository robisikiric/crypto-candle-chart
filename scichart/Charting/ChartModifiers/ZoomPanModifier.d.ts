import { IIncludeXAxis } from "../../Core/IIncludeXAxis";
import { IIncludeYAxis } from "../../Core/IIncludeYAxis";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
import { IPinchZoomModifierOptions, PinchZoomModifier } from "./PinchZoomModifier";
/**
 * Options for passing to the constructor of {@link ChartModifierBase2D} derived types
 */
export interface IZoomPanModifierOptions extends IPinchZoomModifierOptions {
    /**
     * Sets whether to enable pinch zoom behavior of {@link SciChartSurface} on touchscreen devices
     */
    enableZoom?: boolean;
}
/**
 * The ZoomPanModifier provides drag to pan behavior on a 2D {@link SciChartSurface}
 * as well as pinch zoom behavior on touchscreen devices
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the ZoomPanModifier to a {@link SciChartSurface} and add drag to pan behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new ZoomPanModifier());
 * ```
 */
export declare class ZoomPanModifier extends PinchZoomModifier implements IIncludeXAxis, IIncludeYAxis {
    readonly type: EChart2DModifierType;
    /**
     * Sets whether to enable pinch zoom behavior of {@link SciChartSurface} on touchscreen devices
     */
    enableZoom: boolean;
    /**
     * Creates an instance of a ZoomPanModifier
     * @param options optional parameters to pass to the ZoomPanModifier to configure it upon construction
     */
    constructor(options?: IZoomPanModifierOptions);
    /** @inheritDoc */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseMove(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierMouseUp(args: ModifierMouseArgs): void;
    /** @inheritDoc */
    modifierPointerCancel(args: ModifierMouseArgs): void;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    protected performModifierAction(args: ModifierMouseArgs): void;
    protected getIsActionAllowed(args: ModifierMouseArgs): boolean;
    private performPan;
}
