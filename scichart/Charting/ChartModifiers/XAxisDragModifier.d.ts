import { NumberRange } from "../../Core/NumberRange";
import { Point } from "../../Core/Point";
import { ECursorStyle } from "../../types/CursorStyle";
import { EDragMode } from "../../types/DragMode";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
import { EChart2DModifierType } from "../../types/ChartModifierType";
export interface IXAxisDragModifierOptions extends IChartModifierBaseOptions {
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
 * The XAxisDragModifier provides scaling/panning behavior for X axis {@link AxisBase2D}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the XAxisDragModifier to a {@link SciChartSurface} and add scaling behavior,
 * use the following code:
 *
 * ```ts
 * sciChartSurface.chartModifiers.add(new XAxisDragModifier());
 * ```
 */
export declare class XAxisDragModifier extends ChartModifierBase2D {
    readonly type = EChart2DModifierType.XAxisDrag;
    dragMode: EDragMode;
    protected isClickedOverXAxis: boolean;
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
    constructor(options?: IXAxisDragModifierOptions);
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
    protected getHorizontalXAxes(): AxisBase2D[];
    protected getVerticalXAxes(): AxisBase2D[];
    protected startDragging(axes: AxisBase2D[], args: ModifierMouseArgs): void;
}
