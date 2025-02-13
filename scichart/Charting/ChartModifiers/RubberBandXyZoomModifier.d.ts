import { TEasingFn } from "../../Core/Animations/EasingFunctions";
import { Point } from "../../Core/Point";
import { Rect } from "../../Core/Rect";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { EXyDirection } from "../../types/XyDirection";
import { IThemeProvider } from "../Themes/IThemeProvider";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { RubberBandSvgRect } from "../Visuals/RubberBandSvgRect/RubberBandSvgRect";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 * Optional parameters used to configure a {@link RubberBandXyZoomModifier} at construct time
 */
export interface IRubberBandXyZoomModifierOptions extends IChartModifierBaseOptions {
    /**
     * Sets the fill of {@link RubberBandSvgRect}
     */
    fill?: string;
    /**
     * Sets the stroke of {@link RubberBandSvgRect}
     */
    stroke?: string;
    /**
     * Sets the strokeThickness of {@link RubberBandSvgRect}
     */
    strokeThickness?: number;
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
}
/**
 * The RubberBandXyZoomModifier provides drag-rectangle to zoom behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the RubberBandXyZoomModifier to a {@link SciChartSurface} and add drag to zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new RubberBandXyZoomModifier());
 * ```
 *
 * Animation of the zoom may be controlled via the {@link RubberBandXyZoomModifier.isAnimated},
 * {@link RubberBandXyZoomModifier.animationDuration} and {@link RubberBandXyZoomModifier.easingFunction} properties.
 */
export declare class RubberBandXyZoomModifier extends ChartModifierBase2D {
    static readonly MIN_DRAG_SENSITIVITY = 5;
    readonly type = EChart2DModifierType.RubberBandXYZoom;
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
    rubberBandRect: RubberBandSvgRect | undefined;
    protected pointFrom: Point | undefined;
    protected pointTo: Point | undefined;
    protected isClicked: boolean;
    private fillProperty;
    private strokeProperty;
    private strokeThicknessProperty;
    /**
     * Creates an instance of a RubberBandXyZoomModifier
     * @param options Optional parameters used to configure the modifier
     */
    constructor(options?: IRubberBandXyZoomModifierOptions);
    /**
     * @inheritDoc
     */
    applyTheme(themeProvider: IThemeProvider): void;
    /**
     * @inheritDoc
     */
    onDetach(): void;
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
     * Get the stroke thickness for {@link RubberBandSvgRect}
     */
    get strokeThickness(): number;
    /**
     * Set the stroke thickness for {@link RubberBandSvgRect}
     */
    set strokeThickness(value: number);
    /**
     * Get the stroke for {@link RubberBandSvgRect}
     */
    get stroke(): string;
    /**
     * Set the stroke for {@link RubberBandSvgRect}
     */
    set stroke(value: string);
    /**
     * Get the fill color for {@link RubberBandSvgRect}
     */
    get fill(): string;
    /**
     * Set the fill color for {@link RubberBandSvgRect}
     */
    set fill(value: string);
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    delete(): void;
    /**
     * Performs the zoom operation on the parent Surface, using the mouse points from & to, which
     * define the corners of the rectangle to zoom
     * @param pointFrom the first corner of the rectangle to zoom
     * @param pointTo the second corner of the rectangle to zoom
     */
    protected performZoom(pointFrom: Point, pointTo: Point): void;
    /**
     * Performs a Zoom on a specific axis
     * @param axis the Axis to zoom
     * @param fromCoord the coordinate to zoom from
     * @param toCoord the coordinate to zoom to
     */
    protected performZoomOnAxis(axis: AxisBase2D, fromCoord: number, toCoord: number): void;
    protected notifyPropertyChanged(propertyName: string): void;
    protected calculateDraggedDistance(): number;
    protected updateRubberBandRect(): void;
}
/**
 * Given the starting and end mouse-point, computes a rectangle to perform zoom over. Takes into account the xyDirection
 * @param pointFrom the starting point of the mouse
 * @param pointTo the end point of the mouse
 * @param xyDirection the XyDirection
 * @param viewportRect
 */
export declare function getRubberBandRect(pointFrom: Point, pointTo: Point, xyDirection: EXyDirection, viewportRect: Rect): Rect;
