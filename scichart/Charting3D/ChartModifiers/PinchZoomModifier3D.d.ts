import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { EChart3DModifierType } from "../../types/ChartModifierType";
import { ChartModifierBase3D, IChartModifierBase3DOptions } from "./ChartModifierBase3D";
import { Point } from "../../Core/Point";
/**
 * Optional parameters passed to the constructor of {@link PinchZoomModifier3D} to configure it
 */
export interface IPinchZoomModifier3DOptions extends IChartModifierBase3DOptions {
    /**
     * Defines the sensitivity of zooming
     */
    growFactor?: number;
}
/**
 * @summary The {@link PinchZoomModifier3D} provides pinch zooming behavior on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link PinchZoomModifier3D} to a {@link SciChart3DSurface} and add pinch zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new PinchZoomModifier3D());
 * ```
 *
 * @remarks The speed of zoom can be modified via the {@link PinchZoomModifier3D.mouseWheelSensitivity} property.
 */
export declare class PinchZoomModifier3D extends ChartModifierBase3D {
    readonly type: EChart3DModifierType;
    /**
     * Defines the sensitivity of zooming
     */
    growFactor: number;
    /**
     * touch points X coordinates difference
     */
    protected previousHorizontalTouchPointsDistance: number;
    /**
     * touch points Y coordinates difference
     */
    protected previousVerticalTouchPointsDistance: number;
    /**
     * Creates an instance of the {@link MouseWheelZoomModifier3D}
     * @param options optional parameters of type {@link IMouseWheelZoomModifier3DOptions} used to configure the modifier
     */
    constructor(options?: IPinchZoomModifier3DOptions);
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
    /**
     * @inheritDoc
     */
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBase3DOptions, never>>;
    };
    /**
     * Performs the zoom operation around the mouse point
     * @param mousePoint The X,Y location of the mouse at the time of the zoom
     * @param horizontalDistance horizontal distance between points
     * @param verticalDistance vertical distance between points
     */
    protected performZoom(mousePoint: Point, horizontalDistance: number, verticalDistance: number): void;
    /**
     * Handles pointer event becoming inactive
     * @param args pointer event properties
     */
    protected removeFromActiveTouchEvents(args: ModifierMouseArgs): void;
    protected performModifierAction(args: ModifierMouseArgs): void;
    protected getIsActionAllowed(args: ModifierMouseArgs): boolean;
}
