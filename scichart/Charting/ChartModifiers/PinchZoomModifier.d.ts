import { Point } from "../../Core/Point";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 * Optional parameters used to configure a {@link PinchZoomModifier} at construct time
 */
export interface IPinchZoomModifierOptions extends IChartModifierBaseOptions {
    /**
     * Defines the sensitivity of zooming in horizontal direction
     */
    horizontalGrowFactor?: number;
    /**
     * Defines the sensitivity of zooming in vertical direction
     */
    verticalGrowFactor?: number;
    /**
     * A list of Ids for X axis to exclude from this modifier
     * @remarks Also see {@link ZoomPanModifier.includeXAxis} function which allows you to include or exclude an axis by instance
     */
    excludedXAxisIds?: string[];
    /**
     * A list of Ids for Y axis to exclude from this modifier
     * @remarks Also see {@link ZoomPanModifier.includeYAxis} function which allows you to include or exclude an axis by instance
     */
    excludedYAxisIds?: string[];
    /**
     * A list of Ids for X axis to include to this modifier
     * @remarks Also see {@link ZoomPanModifier.includeXAxis} function which allows you to include or exclude an axis by instance
     */
    includedXAxisIds?: string[];
    /**
     * A list of Ids for Y axis to include this modifier
     * @remarks Also see {@link ZoomPanModifier.includeYAxis} function which allows you to include or exclude an axis by instance
     */
    includedYAxisIds?: string[];
}
/**
 * The PinchZoomModifier provides ability to zoom by pinch gesture on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the PinchZoomModifier to a {@link SciChartSurface} and add pinch zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new PinchZoomModifier());
 * ```
 *
 * It is also necessary to set “touch-action: none” on the chart div element.
 */
export declare class PinchZoomModifier extends ChartModifierBase2D {
    readonly type: EChart2DModifierType;
    /**
     * Defines the sensitivity of zooming in horizontal direction
     */
    horizontalGrowFactor: number;
    /**
     * Defines the sensitivity of zooming in vertical direction
     */
    verticalGrowFactor: number;
    protected includedXAxisMap: Map<string, boolean>;
    protected includedYAxisMap: Map<string, boolean>;
    /**
     * touch points X coordinates difference
     */
    private previousHorizontalTouchPointsDistance;
    /**
     * touch points Y coordinates difference
     */
    private previousVerticalTouchPointsDistance;
    /**
     * Creates an instance of a PinchZoomModifier
     * @param options Optional parameters used to configure the modifier
     */
    constructor(options?: IPinchZoomModifierOptions);
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
    modifierPointerCancel(args: ModifierMouseArgs): void;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
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
    /**
     * Performs the zoom operation around the mouse point
     * @param mousePoint The X,Y location of the mouse at the time of the zoom
     * @param horizontalPinchDelta horizontal pinch delta
     * @param verticalPinchDelta vertical pinch delta
     */
    protected performZoom(mousePoint: Point, horizontalPinchDelta: number, verticalPinchDelta: number, horizontalGrowFactor: number, verticalGrowFactor: number): void;
    /**
     * Handles pointer event becoming inactive
     * @param args pointer event properties
     */
    protected removeFromActiveTouchEvents(args: ModifierMouseArgs): void;
    protected performModifierAction(args: ModifierMouseArgs): void;
    protected getIsActionAllowed(args: ModifierMouseArgs): boolean;
    /**
     * returns a point equidistant to the provided ones
     * @param firstPoint the X,Y location of the first active pointer
     * @param secondPoint the X,Y location of the second active pointer
     */
    private getMiddlePoint;
}
