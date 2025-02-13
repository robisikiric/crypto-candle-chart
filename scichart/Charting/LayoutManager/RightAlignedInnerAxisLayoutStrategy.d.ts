import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseCenteredAxisLayoutStrategy, IInnerAxisLayoutStrategyOptions } from "./BaseCenteredAxisLayoutStrategy";
import { ChartLayoutState } from "./ChartLayoutState";
/**
 * The default LayoutStrategy for Right Inner Axis
 */
export declare class RightAlignedInnerAxisLayoutStrategy extends BaseCenteredAxisLayoutStrategy {
    readonly type = ELayoutStrategyType.RightInner;
    constructor(options?: IInnerAxisLayoutStrategyOptions);
    measureAxes(sciChartSurface: SciChartSurface, chartLayoutState: ChartLayoutState, axes: AxisBase2D[]): void;
    layoutAxes(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
}
