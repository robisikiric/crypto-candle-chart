import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { AxisBase2D } from "../Visuals/Axis/AxisBase2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseCenteredAxisLayoutStrategy, IInnerAxisLayoutStrategyOptions } from "./BaseCenteredAxisLayoutStrategy";
import { ChartLayoutState } from "./ChartLayoutState";
/**
 * The default LayoutStrategy for Left Inner Axis
 */
export declare class LeftAlignedInnerAxisLayoutStrategy extends BaseCenteredAxisLayoutStrategy {
    readonly type = ELayoutStrategyType.LeftInner;
    constructor(options?: IInnerAxisLayoutStrategyOptions);
    measureAxes(sciChartSurface: SciChartSurface, chartLayoutState: ChartLayoutState, axes: AxisBase2D[]): void;
    layoutAxes(left: number, top: number, right: number, bottom: number, axes: AxisBase2D[]): void;
}
