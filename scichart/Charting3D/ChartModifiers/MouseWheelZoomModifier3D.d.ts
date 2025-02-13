import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { EChart3DModifierType } from "../../types/ChartModifierType";
import { ChartModifierBase3D, IChartModifierBase3DOptions } from "./ChartModifierBase3D";
/**
 * Optional parameters passed to the constructor of {@link MouseWheelZoomModifier3D} to configure it
 */
export interface IMouseWheelZoomModifier3DOptions extends IChartModifierBase3DOptions {
    /**
     * The mouse wheel sensitifivity is a factor that determines how much the camera zooms when the mouse wheel scrolls.
     * Default value is 0.1
     */
    mouseWheelSensitivity?: number;
}
/**
 * @summary The {@link MouseWheelZoomModifier3D} provides Mouse wheel zooming behavior on a 3D {@link SciChart3DSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 *
 * To apply the {@link MouseWheelZoomModifier3D} to a {@link SciChart3DSurface} and add Mouse-wheel zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartS3Durface: SciChart3DSurface;
 * sciChart3DSurface.chartModifiers.add(new MouseWheelZoomModifier3D());
 * ```
 *
 * @remarks The speed of mouse-wheel zoom can be modified via the {@link MouseWheelZoomModifier3D.mouseWheelSensitivity} property.
 */
export declare class MouseWheelZoomModifier3D extends ChartModifierBase3D {
    readonly type = EChart3DModifierType.MouseWheelZoom;
    /**
     * The mouse wheel sensitifivity is a factor that determines how much the camera zooms when the mouse wheel scrolls.
     * Default value is 0.1
     */
    mouseWheelSensitivity: number;
    /**
     * Creates an instance of the {@link MouseWheelZoomModifier3D}
     * @param options optional parameters of type {@link IMouseWheelZoomModifier3DOptions} used to configure the modifier
     */
    constructor(options?: IMouseWheelZoomModifier3DOptions);
    /**
     * @inheritDoc
     */
    modifierMouseWheel(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBase3DOptions, never>>;
    };
}
