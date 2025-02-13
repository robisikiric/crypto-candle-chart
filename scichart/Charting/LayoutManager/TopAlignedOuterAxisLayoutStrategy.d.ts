import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseAxisLayoutStrategy } from "./BaseAxisLayoutStrategy";
import { ChartLayoutState } from "./ChartLayoutState";
/**
 * The default LayoutStrategy for Top Axis
 */
export declare class TopAlignedOuterAxisLayoutStrategy extends BaseAxisLayoutStrategy {
    readonly type = ELayoutStrategyType.TopOuter;
    constructor();
    measureAxes(sciChartSurface: SciChartSurface, chartLayoutState: ChartLayoutState, axes: AxisBase2D[]): void;
    layoutAxes(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
}
