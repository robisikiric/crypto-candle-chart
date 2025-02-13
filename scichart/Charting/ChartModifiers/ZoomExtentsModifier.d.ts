import { TEasingFn } from "../../Core/Animations/EasingFunctions";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 * A function to execute when zoomExtents is activated.  If this exists and returns false, the builtin behaviour is ignored;
 */
export declare type TZoomExtentsCallback = (sciChartSurface: SciChartSurface) => boolean;
/**
 * Optional parameters used to configure a {@link ZoomExtentsModifier} at construct time
 */
export interface IZoomExtentsModifierOptions extends IChartModifierBaseOptions {
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
     * A function to execute when zoomExtents is activated.  If this exists and returns false, the builtin behaviour is ignored;
     */
    onZoomExtents?: TZoomExtentsCallback | string;
    /**
     * Whether the modifier applies when the mouse is over the area where series are drawn (ie not over the axes).  Default true.
     */
    applyToSeriesViewRect?: boolean;
    /**
     * Whether the modifier applies when the mouse is over the axes. Default true.
     */
    applyToAxes?: boolean;
}
/**
 * The ZoomExtentsModifier provides double-tap or double-click to zoom-to-fit (Zoom Extents) behavior
 * on a 2D {@link SciChartSurface} within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the ZoomExtentsModifier to a {@link SciChartSurface} and add drag to zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new ZoomExtentsModifier());
 * ```
 *
 * Animation of the zoom extents be controlled via the {@link ZoomExtentsModifier.isAnimated},
 * {@link ZoomExtentsModifier.animationDuration} and {@link ZoomExtentsModifier.easingFunction} properties.
 */
export declare class ZoomExtentsModifier extends ChartModifierBase2D {
    readonly type = EChart2DModifierType.ZoomExtents;
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
    /**
     * A function to execute when zoomExtents is activated.  If this exists and returns false, the builtin behaviour is ignored;
     */
    onZoomExtents?: (sciChartSurface: SciChartSurface) => boolean;
    /**
     * Whether the modifier applies when the mouse is over the area where series are drawn (ie not over the axes).  Default true.
     */
    applyToSeriesViewRect: boolean;
    /**
     * Whether the modifier applies when the mouse is over the axes. Default true.
     */
    applyToAxes: boolean;
    constructor(options?: IZoomExtentsModifierOptions);
    /**
     * @inheritDoc
     */
    modifierDoubleClick(args: ModifierMouseArgs): void;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
}
