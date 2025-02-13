import { IIncludeAxis } from "../../Core/IIncludeAxis";
import { NumberRange } from "../../Core/NumberRange";
import { Point } from "../../Core/Point";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { ECursorStyle } from "../../types/CursorStyle";
import { EDragMode } from "../../types/DragMode";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
export interface IYAxisDragModifierOptions extends IChartModifierBaseOptions {
    /**
     * Flags defining whether the {@link XAxisDragModifier} Drags or Pans the chart
     * @remarks see {@link EDragMode} for more details
     */
    dragMode?: EDragMode;
    /**
     * A list of Ids for axis to exclude from this modifier
     * @remarks Also see {@link XAxisDragModifier.includeAxis} function which allows you to include or exclude an axis by instance
     */
    excludedAxisIds?: string[];
}
/**
 * The YAxisDragModifier provides scaling/panning behavior for Y axis {@link AxisBase2D}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the YAxisDragModifier to a {@link SciChartSurface} and add scaling behavior,
 * use the following code:
 *
 * ```ts
 * sciChartSurface.chartModifiers.add(new YAxisDragModifier());
 * ```
 */
export declare class YAxisDragModifier extends ChartModifierBase2D implements IIncludeAxis {
    readonly type = EChart2DModifierType.YAxisDrag;
    dragMode: EDragMode;
    protected isClickedOverYAxis: boolean;
    protected pointFrom: Point | undefined;
    protected activeAxes: AxisBase2D[];
    protected initialVisibleRanges: NumberRange[];
    protected isVerticalChart: boolean;
    protected cursorStyle: ECursorStyle;
    protected includedSeriesMapProperty: Map<string, boolean>;
    /**
     * Creates an instance of a XAxisDragModifier
     * @param options optional parameters to pass to the XAxisDragModifier to configure it upon construction
     */
    constructor(options?: IYAxisDragModifierOptions);
    /**
     * @inheritDoc
     */
    includeAxis(axis: AxisBase2D, isIncluded: boolean): void;
    /**
     * @inheritDoc
     */
    getIncludedAxis(): AxisBase2D[];
    /**
     * Used internally for tests. Gets a Map of included Axis
     * @remarks Axis include flag set to false means excluded. Axis not present or flag=true means included
     */
    get includedAxisMap(): Map<string, boolean>;
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
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    protected updateCursor(mousePoint: Point): void;
    protected doPanning(mousePoint: Point): void;
    protected doScaling(pointTo: Point): void;
    protected getVerticalYAxes(): AxisBase2D[];
    protected getHorizontalYAxes(): AxisBase2D[];
    protected startDragging(axes: AxisBase2D[], args: ModifierMouseArgs): void;
}
