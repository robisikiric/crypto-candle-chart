import { TLayoutManagerDefinition } from "../../Builder/buildSurface";
import { Rect } from "../../Core/Rect";
import { Thickness } from "../../Core/Thickness";
import { EAxisAlignment } from "../../types/AxisAlignment";
import { ELayoutManagerType } from "../../types/LayoutMangerType";
import { ELayoutStrategyType } from "../../types/LayoutStrategyType";
import { Size } from "../../types/Size";
import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseAxisLayoutStrategy } from "./BaseAxisLayoutStrategy";
import { BaseCenteredAxisLayoutStrategy, IInnerAxisLayoutStrategyOptions } from "./BaseCenteredAxisLayoutStrategy";
import { ChartLayoutState } from "./ChartLayoutState";
import { LayoutStrategyAxes } from "./LayoutStrategyAxes";
export declare type TOuterLayoutStrategyDefinition = {
    type: ELayoutStrategyType;
    options?: any;
    customType?: string;
};
export declare type TInnerLayoutStrategyDefinition = {
    type: ELayoutStrategyType;
    options?: IInnerAxisLayoutStrategyOptions;
    customType?: string;
};
/**
 * The options for a {@link LayoutManager}. Default layout strategies will be used if not provided.
 */
export interface ILayoutManagerOptions {
    LeftOuter?: BaseAxisLayoutStrategy | TOuterLayoutStrategyDefinition;
    RightOuter?: BaseAxisLayoutStrategy | TOuterLayoutStrategyDefinition;
    TopOuter?: BaseAxisLayoutStrategy | TOuterLayoutStrategyDefinition;
    BottomOuter?: BaseAxisLayoutStrategy | TOuterLayoutStrategyDefinition;
    LeftInner?: BaseCenteredAxisLayoutStrategy | TInnerLayoutStrategyDefinition;
    RightInner?: BaseCenteredAxisLayoutStrategy | TInnerLayoutStrategyDefinition;
    TopInner?: BaseCenteredAxisLayoutStrategy | TInnerLayoutStrategyDefinition;
    BottomInner?: BaseCenteredAxisLayoutStrategy | TInnerLayoutStrategyDefinition;
}
/**
 * The job of the ILayoutManager is to calculate the size and location of the axes and the resulting size of the seriesViewRect - the area where series will be drawn.
 * This is done by deferring to the LayoutStrategy for each area which could house axes.
 */
export declare class LayoutManager {
    type: ELayoutManagerType;
    /**
     * Layout strategy for layout of left aligned axis outside
     */
    protected leftOuterAxesLayoutStrategyProperty: BaseAxisLayoutStrategy;
    /**
     * Layout strategy for layout of right aligned axis outside
     */
    protected rightOuterAxesLayoutStrategyProperty: BaseAxisLayoutStrategy;
    /**
     * Layout strategy for layout of top aligned axis outside
     */
    protected topOuterAxesLayoutStrategyProperty: BaseAxisLayoutStrategy;
    /**
     * Layout strategy for layout of bottom aligned axis outside
     */
    protected bottomOuterAxesLayoutStrategyProperty: BaseAxisLayoutStrategy;
    /**
     * Layout strategy for layout of left aligned inner axis
     */
    leftInnerAxesLayoutStrategy: BaseCenteredAxisLayoutStrategy;
    /**
     * Layout strategy for layout of right aligned inner axis
     */
    rightInnerAxesLayoutStrategy: BaseCenteredAxisLayoutStrategy;
    /**
     * Layout strategy for layout of top aligned inner axis
     */
    topInnerAxesLayoutStrategy: BaseCenteredAxisLayoutStrategy;
    /**
     * Layout strategy for layout of bottom aligned inner axis
     */
    bottomInnerAxesLayoutStrategy: BaseCenteredAxisLayoutStrategy;
    sciChartSurface: SciChartSurface;
    protected chartLayoutState: ChartLayoutState;
    protected axesGroupedByLayoutStrategy: LayoutStrategyAxes;
    constructor(options?: ILayoutManagerOptions);
    get leftOuterAxesLayoutStrategy(): BaseAxisLayoutStrategy;
    set leftOuterAxesLayoutStrategy(value: BaseAxisLayoutStrategy);
    get rightOuterAxesLayoutStrategy(): BaseAxisLayoutStrategy;
    set rightOuterAxesLayoutStrategy(value: BaseAxisLayoutStrategy);
    get topOuterAxesLayoutStrategy(): BaseAxisLayoutStrategy;
    set topOuterAxesLayoutStrategy(value: BaseAxisLayoutStrategy);
    get bottomOuterAxesLayoutStrategy(): BaseAxisLayoutStrategy;
    set bottomOuterAxesLayoutStrategy(value: BaseAxisLayoutStrategy);
    getAxisLayoutStrategy(axisAlignment: EAxisAlignment, isInnerAxis: boolean): BaseAxisLayoutStrategy;
    layoutChart(viewportSize: Size, padding?: Thickness): Rect;
    toJSON(): TLayoutManagerDefinition;
    protected measureLeftOuterAxes(): void;
    protected measureRightOuterAxes(): void;
    protected measureTopOuterAxes(): void;
    protected measureBottomOuterAxes(): void;
    protected measureLeftInnerAxes(): void;
    protected measureRightInnerAxes(): void;
    protected measureTopInnerAxes(): void;
    protected measureBottomInnerAxes(): void;
    protected groupAxesByLayoutStrategy(): void;
    private layoutChartCenter;
    private setSeriesViewRect;
    private createStrategy;
}
