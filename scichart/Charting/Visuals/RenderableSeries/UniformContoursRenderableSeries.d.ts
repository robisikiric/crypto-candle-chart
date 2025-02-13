import { PropertyChangedEventArgs } from "../../../Core/PropertyChangedEventArgs";
import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { IPointSeries } from "../../Model/PointSeries/IPointSeries";
import { UniformHeatmapDataSeries } from "../../Model/UniformHeatmapDataSeries";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { IContoursDataLabelProviderOptions } from "./DataLabels/ContoursDataLabelProvider";
import { HeatmapColorMap, IHeatmapColorMapOptions } from "./HeatmapColorMap";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
/**
 * Optional parameters passed to {@link UniformContoursRenderableSeries} constructor
 */
export interface IContoursRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * The {@link HeatmapColorMap} instance, which maps heatmap z-values to colors
     * or an {@link IHeatmapColorMapOptions} object which will be used to build a HeatmapColorMap
     */
    colorMap?: HeatmapColorMap | IHeatmapColorMapOptions;
    /**
     * The {@link UniformHeatmapDataSeries} instance containing 2-dimensional heatmap data
     */
    dataSeries?: UniformHeatmapDataSeries;
    zMin?: number;
    zMax?: number;
    zStep?: number;
    majorLineStyle?: TContourLineStyle;
    minorLineStyle?: TContourLineStyle;
    minorsPerMajor?: number;
    /**
     * Options to pass to the {@link DataLabelProvider}. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: IContoursDataLabelProviderOptions;
}
export interface IContourDrawingParams {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    zMin: number;
    zMax: number;
    majorStepZ: number;
    minorStepZ: number;
    majorLineStyle: TContourLineStyle;
    minorLineStyle: TContourLineStyle;
}
/**
 * A type class to contain information about contour line styles
 * @remarks
 * A contour line is drawn using the {@link UniformContoursRenderableSeries} with a 2D array of data
 * - Set the color as an HTML Color code to define the color
 * - Set the strokeThickness to change the thickness of the contour line
 */
export declare type TContourLineStyle = {
    strokeThickness?: number;
    color?: string;
};
/** @ignore */
export declare const COLOR_MAP_PREFIX = "colorMap.";
export declare enum EContourColorMapMode {
    /**
     *  Applies the Gradient Colors from {@link UniformContoursRenderableSeries} ColorMap individually,
     *  ignoring offsets, e.g. with Gradient Stops Red, Green, Blue then
     *  contour lines will appear Red Green or Blue
     */
    AlternateColors = 0,
    /**
     * Applies the Gradient Colors from {@link UniformContoursRenderableSeries} ColorMap according to the data on the chart
     */
    GradientColors = 1
}
export declare class UniformContoursRenderableSeries extends BaseRenderableSeries {
    static readonly DEFAULT_CONTOURS_COUNT: number;
    static readonly DEFAULT_MAJOR_LINE_STYLE: TContourLineStyle;
    static readonly DEFAULT_MINOR_LINE_STYLE: TContourLineStyle;
    readonly type: ESeriesType;
    private colorMapProperty;
    private zMinProperty;
    private zMaxProperty;
    private zStepProperty;
    private colorMapModeProperty;
    private majorLineStyleProperty;
    private minorLineStyleProperty;
    private minorsPerMajorProperty;
    /**
     * Creates an instance of the {@link UniformHeatmapRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IHeatmapRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: IContoursRenderableSeriesOptions);
    get zMin(): number;
    set zMin(zMin: number);
    get zMax(): number;
    set zMax(zMax: number);
    get zStep(): number;
    set zStep(zStep: number);
    /**
     * Gets or sets the {@link HeatmapColorMap}, which maps heatmap z-values to colors
     */
    get colorMap(): HeatmapColorMap;
    /**
     * Gets or sets the {@link HeatmapColorMap}, which maps heatmap z-values to colors
     */
    set colorMap(colorMap: HeatmapColorMap);
    get colorMapMode(): EContourColorMapMode;
    set colorMapMode(colorMapMode: EContourColorMapMode);
    get majorLineStyle(): TContourLineStyle;
    set majorLineStyle(majorLineStyle: TContourLineStyle);
    get minorLineStyle(): TContourLineStyle;
    set minorLineStyle(minorLineStyle: TContourLineStyle);
    get minorsPerMajor(): number;
    set minorsPerMajor(minorsPerMajor: number);
    getContourDrawingParams(): IContourDrawingParams;
    /** @inheritDoc */
    toPointSeries(resamplingParams?: ResamplingParams): IPointSeries;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
    /**
     * Called when a property changes on {@link HeatmapColorMap}, and notifies the parent {@link SciChartSurface}
     * that a redraw is required.
     * @param args
     */
    protected colorMapPropertyChanged(args: PropertyChangedEventArgs): void;
    protected newHitTestProvider(): IHitTestProvider;
}
