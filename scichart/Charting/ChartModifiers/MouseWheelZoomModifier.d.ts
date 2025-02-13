import { IIncludeXAxis } from "../../Core/IIncludeXAxis";
import { IIncludeYAxis } from "../../Core/IIncludeYAxis";
import { Point } from "../../Core/Point";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 * Options for passing to the constructor of {@link MouseWheelZoomModifier}
 */
export interface IMouseWheelZoomModifierOptions extends IChartModifierBaseOptions {
    /**
     * Modifies the speed of mousewheel zoom, for example growFactor = 0.001 means each mousewheel 'click'
     * zooms the chart 0.1%
     */
    growFactor?: number;
    /**
     * Defines whether the Mouse Wheel zooms or pans. See {@link EActionType} for options
     */
    actionType?: EActionType;
    /**
     * Whether the modifier applies when the mouse is over the chart area (ie not over the axes).  Default true.
     */
    applyToSeriesViewRect?: boolean;
    /**
     * Whether the modifier applies when the mouse is over the axes. Default true.
     */
    applyToAxes?: boolean;
    /**
     * A list of Ids for X axis to exclude from this modifier
     * @remarks Also see {@link MouseWheelZoomModifier.includeXAxis} function which allows you to include or exclude an axis by instance
     */
    excludedXAxisIds?: string[];
    /**
     * A list of Ids for Y axis to exclude from this modifier
     * @remarks Also see {@link MouseWheelZoomModifier.includeYAxis} function which allows you to include or exclude an axis by instance
     */
    excludedYAxisIds?: string[];
    /**
     * A list of Ids for X axis to include to this modifier
     * @remarks Also see {@link MouseWheelZoomModifier.includeXAxis} function which allows you to include or exclude an axis by instance
     */
    includedXAxisIds?: string[];
    /**
     * A list of Ids for Y axis to include this modifier
     * @remarks Also see {@link MouseWheelZoomModifier.includeYAxis} function which allows you to include or exclude an axis by instance
     */
    includedYAxisIds?: string[];
}
/**
 * Defines enumeration constants for the zoom or pan action on {@link MouseWheelZoomModifier}
 */
export declare enum EActionType {
    /**
     * Zooms in and out when the Mouse Wheel event occurs
     */
    Zoom = 0,
    /**
     * Pans when the Mouse Wheel event occurs
     */
    Pan = 1
}
/**
 * The MouseWheelZoomModifier provides Mouse wheel zooming behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the MouseWheelZoomModifier to a {@link SciChartSurface} and add Mouse-wheel zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new MouseWheelZoomModifier());
 * ```
 *
 * The speed of mouse-wheel zoom can be modified via the {@link MouseWheelZoomModifier.growFactor} property.
 */
export declare class MouseWheelZoomModifier extends ChartModifierBase2D implements IIncludeXAxis, IIncludeYAxis {
    readonly type = EChart2DModifierType.MouseWheelZoom;
    /**
     * Modifies the speed of mousewheel zoom, for example growFactor = 0.001 means each mousewheel 'click'
     * zooms the chart 0.1%
     */
    growFactor: number;
    /**
     * Defines whether the Mouse Wheel zooms or pans. See {@link EActionType} for options
     */
    actionType: EActionType;
    /**
     * Whether the modifier applies when the mouse is over the area where series are drawn (ie not over the axes).  Default true.
     */
    applyToSeriesViewRect: boolean;
    /**
     * Whether the modifier applies when the mouse is over the axes. Default true.
     */
    applyToAxes: boolean;
    private includedXAxisMap;
    private includedYAxisMap;
    /**
     * Creates an instance of MouseWheelZoomModifier
     * @param options Optional parameters to configure the modifier via {@link IMouseWheelZoomModifierOptions}
     */
    constructor(options?: IMouseWheelZoomModifierOptions);
    /**
     * @inheritDoc
     */
    modifierMouseWheel(args: ModifierMouseArgs): void;
    /**
     * Performs the zoom operation around the mouse point
     * @param mousePoint The X,Y location of the mouse at the time of the zoom
     * @param wheelDelta the MouseWheel delta
     */
    performZoom(mousePoint: Point, wheelDelta: number): boolean;
    /**
     * Performs a pan operation
     * @param wheelDelta the MouseWheel delta
     */
    performPan(wheelDelta: number): boolean;
    /** @inheritDoc */
    includeXAxis(axis: AxisBase2D, isIncluded: boolean): void;
    /** @inheritDoc */
    includeYAxis(axis: AxisBase2D, isIncluded: boolean): void;
    /** @inheritDoc */
    includeAllAxes(): void;
    /** @inheritDoc */
    getIncludedXAxis(): AxisBase2D[];
    /** @inheritDoc */
    getIncludedYAxis(): AxisBase2D[];
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    /**
     * Gets the axis size for scroll calculations
     * @param axis
     * @protected
     */
    protected getAxisSize(axis: AxisBase2D): number;
}
