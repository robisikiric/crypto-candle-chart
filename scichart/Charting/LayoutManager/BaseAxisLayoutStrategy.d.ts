import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { TLayoutAxisPartsWithStrategyFunc } from "./AxisLayoutHelpers";
import { ChartLayoutState } from "./ChartLayoutState";
/**
 * The Base Axis Layout Strategy
 */
export declare abstract class BaseAxisLayoutStrategy {
    abstract readonly type: ELayoutStrategyType;
    readonly isStacked: boolean;
    /**
     * The  {@link LayoutAxisPartsStrategy} for current Axis Layout Strategy
     */
    protected layoutAxisPartsStrategy: TLayoutAxisPartsWithStrategyFunc;
    /**
     * Measures required amount of space to place axes which are currently attached to the SciChartSurface {@link SciChartSurface} instance
     *
     * @param sciChartSurface
     * @param chartLayoutState
     * @param axes
     */
    abstract measureAxes(sciChartSurface: SciChartSurface, chartLayoutState: ChartLayoutState, axes: AxisBase2D[]): void;
    /**
     * Perform layout on axes which use this layout strategy
     *
     * @param left   left position of area relative to parent {@link SciChartSurface}
     * @param top    top position of area relative to parent {@link SciChartSurface}
     * @param right  right position of area relative to parent {@link SciChartSurface}
     * @param bottom bottom position of area relative to parent {@link SciChartSurface}
     */
    abstract layoutAxes(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
    toJSON(): {
        type: ELayoutStrategyType;
    };
    protected updateAxisLayoutState(axis: AxisBase2D): void;
    protected updateLeftAndRightChartLayoutState(chartLayoutState: ChartLayoutState, additionalLeftSize: number, additionalRightSize: number): void;
    protected updateTopAndBottomChartLayoutState(chartLayoutState: ChartLayoutState, additionalTopSize: number, additionalBottomSize: number): void;
    protected layoutAxesFromBottomToTop(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
    protected layoutAxesFromTopToBottom(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
    protected layoutAxesFromLeftToRight(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
    protected layoutAxesFromRightToLeft(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
    protected calculateTotalAxisHeight(axis: AxisBase2D, totalAxisAreaHeight: number): number;
    protected calculateTotalAxisWidth(axis: AxisBase2D, totalAxisAreaHeight: number): number;
}
