import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseAxisLayoutStrategy } from "./BaseAxisLayoutStrategy";
import { ChartLayoutState } from "./ChartLayoutState";
/**
 * The default LayoutStrategy for Right Axis
 */
export declare class RightAlignedOuterAxisLayoutStrategy extends BaseAxisLayoutStrategy {
    readonly type = ELayoutStrategyType.RightOuter;
    constructor();
    measureAxes(sciChartSurface: SciChartSurface, chartLayoutState: ChartLayoutState, axes: AxisBase2D[]): void;
    layoutAxes(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
}
