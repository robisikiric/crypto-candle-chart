import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseAxisLayoutStrategy } from "./BaseAxisLayoutStrategy";
import { ChartLayoutState } from "./ChartLayoutState";
/**
 * The Vertically Stacked Layout Strategy for Left Axes
 */
export declare class LeftAlignedOuterVerticallyStackedAxisLayoutStrategy extends BaseAxisLayoutStrategy {
    readonly type = ELayoutStrategyType.LeftStacked;
    readonly isStacked: boolean;
    constructor();
    measureAxes(sciChartSurface: SciChartSurface, chartLayoutState: ChartLayoutState, axes: AxisBase2D[]): void;
    layoutAxes(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
}
