import { IDeletable } from "../../Core/IDeletable";
import { TGradientStop } from "../../types/TGradientStop";
import { EThemeProviderType } from "../../types/ThemeProviderType";
import { TSciChart } from "../../types/TSciChart";
import { IThemePartial, IThemeProvider } from "../Themes/IThemeProvider";
import { IAxisBase2dOptions } from "./Axis/AxisBase2D";
import { HeatmapColorMap, IHeatmapColorMapOptions } from "./RenderableSeries/HeatmapColorMap";
import { SciChartSurface, TWebAssemblyChart } from "./SciChartSurface";
import { DeletableEntity } from "../../Core/DeletableEntity";
export interface IHeatmapLegendOptions {
    /**
     * Optional - options applied to the yaxis used in the inner {@link SciChartSurface} in the {@link HeatmapLegend} control
     */
    yAxisOptions?: IAxisBase2dOptions;
    /**
     * Optional - The theme applied to the inner {@link SciChartSurface} on startup
     * @remarks see {@link IThemeProvider} for properties which can affect SciChart theme. Two default
     * themes are included out of the box {@link SciChartJSLightTheme} and {@link SciChartJSDarkTheme}.
     * Custom themes may be created by implementing {@link IThemeProvider}
     */
    theme?: IThemeProvider | ({
        type: string | EThemeProviderType;
    } & IThemePartial);
    /**
     * The {@link HeatmapColorMap} instance, which maps heatmap z-values to colors
     * or an {@link IHeatmapColorMapOptions} object which will be used to build a HeatmapColorMap
     */
    colorMap?: HeatmapColorMap | IHeatmapColorMapOptions;
}
export declare type THeatmapLegend = {
    wasmContext: TSciChart;
    heatmapLegend: HeatmapLegend;
};
/**
 * @summary The HeatmapLegend displays a control which hosts a {@link SciChartSurface} in a specific Div on the chart.
 * The legend contains a gradient fill and can be used in conjunction with {@link UniformHeatmapRenderableSeries},
 * {@link NonUniformHeatmapRenderableSeries} or {@link SurfaceMeshRenderableSeries3D} to allow the user to see what colors map
 * to what values on the heatmap or surface.
 * @remarks This control will expand to fit its parent Div. Suggest placing the div to the right and floating 100px wide to
 * create a good effect.
 */
export declare class HeatmapLegend extends DeletableEntity implements IDeletable {
    /**
     * Asynchronously creates a {@link HeatmapLegend} and @link TSciChart | WebAssembly Context} to occupy the div by element ID in your DOM.
     * @remarks This method is async and must be awaited
     * @param divElement The Div Element ID or reference where the {@link HeatmapLegend} will reside
     * @param options Optional - Optional parameters for chart creation. See {@link IHeatmapLegendOptions} for more details
     */
    static create(divElement: string | HTMLDivElement, options?: IHeatmapLegendOptions): Promise<THeatmapLegend>;
    private readonly SIZE;
    private wasmContext;
    private sciChartSurface;
    /**
     * Creates a new HeatmapLegend wrapping a SciChartSurface. Use the {@link HeatmapLegend.create()} function to create this asynchronously
     * @param sciChartSurface
     * @param options
     */
    constructor(sciChartSurface: SciChartSurface, options?: IHeatmapLegendOptions);
    /**
     * Deletes the {@link HeatmapLegend} control, its {@link innerSciChartSurface} and all associated webassembly memory
     */
    delete(): void;
    /**
     * Returns the inner {@link SciChartSurface} which renders the heatmap legend
     */
    get innerSciChartSurface(): TWebAssemblyChart;
    /**
     * Gets the default {@link TGradientStop | GradientStops} to apply to the inner {@link SciChartSurface}
     * @protected
     */
    getDefaultGradientStops(): TGradientStop[];
    /**
     * Gets the default options to apply to the inner {@link SciChartSurface} xAxis. Must conform to {@link IAxisBase2dOptions} interface
     * @protected
     */
    getDefaultXAxisOptions(): {
        drawMajorGridLines: boolean;
        drawMinorGridLines: boolean;
        drawMajorTickLines: boolean;
        drawMinorTickLines: boolean;
        drawLabels: boolean;
    };
    /**
     * Gets the default options to apply to the inner {@link SciChartSurface} yAxis. Must conform to {@link IAxisBase2dOptions} interface
     * @protected
     */
    getDefaultYAxisOptions(): {
        maxAutoTicks: number;
        drawMajorGridLines: boolean;
        drawMinorGridLines: boolean;
        drawLabels: boolean;
        drawMajorTickLines: boolean;
        drawMinorTickLines: boolean;
    };
    getZValues(minimum: number, maximum: number): number[][];
}
