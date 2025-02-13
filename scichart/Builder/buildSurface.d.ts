import { ICentralAxesLayoutManagerOptions } from "../Charting/LayoutManager/CentralAxesLayoutManager";
import { ILayoutManagerOptions } from "../Charting/LayoutManager/LayoutManager";
import { I2DSubSurfaceOptions, I2DSurfaceOptions } from "../Charting/Visuals/I2DSurfaceOptions";
import { IPieSurfaceOptions } from "../Charting/Visuals/SciChartPieSurface/IPieSurfaceOptions";
import { IPieSegmentOptions } from "../Charting/Visuals/SciChartPieSurface/PieSegment/PieSegment";
import { SciChartPieSurface } from "../Charting/Visuals/SciChartPieSurface/SciChartPieSurface";
import { SciChartSurface } from "../Charting/Visuals/SciChartSurface";
import { ELayoutManagerType } from "../types/LayoutMangerType";
import { TSciChart } from "../types/TSciChart";
import { TAnnotationDefinition } from "./buildAnnotations";
import { TAxisDefinition } from "./buildAxis";
import { TSharedDataDefinition } from "./buildDataSeries";
import { TModifierDefinition } from "./buildModifiers";
import { TSeriesDefinition } from "./buildSeries";
/**
 * A definition that can be used to build a 2D Chart using {@link chartBuilder.buildChart}
 */
export interface ISciChart2DDefinition {
    /** Optional {@link I2DSurfaceOptions} to pass to the surface */
    surface?: I2DSurfaceOptions;
    /** One or an array of {@link TAxisDefinition} to describe the X Axes.  Defaults to a single numeric axis */
    xAxes?: TAxisDefinition[] | TAxisDefinition;
    /** One or an array of {@link TAxisDefinition} to describe the Y Axes.  Defaults to a single numeric axis */
    yAxes?: TAxisDefinition[] | TAxisDefinition;
    /** One or an array of {@link TSeriesDefinition} to describe the renderable series */
    series?: TSeriesDefinition[] | TSeriesDefinition;
    /** A {@link TSharedDataDefinition} object that defines data that can be referenced by the series */
    sharedData?: TSharedDataDefinition;
    /** One or an array of {@link TModifierDefinition} to describe modifiers to apply to the chart */
    modifiers?: TModifierDefinition[] | TModifierDefinition;
    /** One or an array of {@link TAnnotationDefinition} to describe annotations to apply to the chart */
    annotations?: TAnnotationDefinition[] | TAnnotationDefinition;
    /**
     * A function, or name of a registered OnCreated function that will be run after the chart is built,
     * receiving the sciChartSurface as a parameter
     */
    onCreated?: ((surface: SciChartSurface) => Promise<void>) | string;
    /**
     * Subcharts to be added to this surface
     */
    subCharts?: ISubChartDefinition[];
    /**
     * Whether to create this chart using a dedicated webassembly context.  See {@link SciChartSurface.createSingle}
     */
    createSingle?: boolean;
}
export interface ISubChartDefinition {
    /** Optional {@link I2DSubSurfaceOptions} to pass to the subSurface */
    surface?: I2DSubSurfaceOptions;
    /** One or an array of {@link TAxisDefinition} to describe the X Axes.  Defaults to a single numeric axis */
    xAxes?: TAxisDefinition[] | TAxisDefinition;
    /** One or an array of {@link TAxisDefinition} to describe the Y Axes.  Defaults to a single numeric axis */
    yAxes?: TAxisDefinition[] | TAxisDefinition;
    /** One or an array of {@link TSeriesDefinition} to describe the renderable series */
    series?: TSeriesDefinition[] | TSeriesDefinition;
    /** A {@link TSharedDataDefinition} object that defines data that can be referenced by the series */
    sharedData?: TSharedDataDefinition;
    /** One or an array of {@link TModifierDefinition} to describe modifiers to apply to the chart */
    modifiers?: TModifierDefinition[] | TModifierDefinition;
    /** One or an array of {@link TAnnotationDefinition} to describe annotations to apply to the chart */
    annotations?: TAnnotationDefinition[] | TAnnotationDefinition;
}
/**
 * A definition that can be used to build a Pie Chart using {@link chartBuilder.buildChart} or {@link chartBuilder.buildPieChart}
 */
export interface ISciChartPieDefinition {
    /** Optional {@link IPieSurfaceOptions} to pass to the surface */
    surface?: IPieSurfaceOptions;
    /**
     * Optional - The {@link IPieSegmentOptions} that specify the segments of the {@link SciChartPieSurface}
     */
    segments?: IPieSegmentOptions[];
    /**
     * A function, or name of a registered OnCreated function that will be run after the chart is built,
     * receiving the sciChartPieSurface as a parameter
     */
    onCreated?: ((surface: SciChartPieSurface) => void) | string;
}
export declare type TLayoutManagerDefinition = {
    type: ELayoutManagerType.Default;
    options?: ILayoutManagerOptions;
} | {
    type: ELayoutManagerType.CentralAxes;
    options?: ICentralAxesLayoutManagerOptions;
} | {
    type: ELayoutManagerType.Synchronised;
    options?: ILayoutManagerOptions;
};
/**
 * Construct a chart with {@link SciChartSurface} using a {@link ISciChart2DDefinition} which can be pure data.
 * @remarks This method is async and must be awaited
 * @param divElementId The Div Element ID where the {@link SciChartSurface} will reside
 * @param definition the {@link ISciChart2DDefinition}
 */
export declare const build2DChart: (divElementId: string | HTMLDivElement, definition: ISciChart2DDefinition | string) => Promise<{
    wasmContext: TSciChart;
    sciChartSurface: SciChartSurface;
}>;
/**
 * Construct a chart with {@link SciChartPieSurface} using a {@link ISciChartPieDefinition} which can be pure data.
 * @remarks This method is async and must be awaited
 * @param divElementId The Div Element ID where the {@link SciChartPieSurface} will reside
 * @param definition the {@link ISciChartPieDefinition}
 */
export declare const buildPieChart: (divElementId: string | HTMLDivElement, definition: ISciChartPieDefinition | string) => Promise<SciChartPieSurface>;
export declare function configure2DSurface(definition: ISciChart2DDefinition, sciChartSurface: SciChartSurface, wasmContext: TSciChart): void;
