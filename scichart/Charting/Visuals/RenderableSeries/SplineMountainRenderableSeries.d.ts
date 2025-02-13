import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { BaseMountainRenderableSeries, IBaseMountainRenderableSeriesOptions } from "./BaseMountainRenderableSeries";
import { ISpline } from "./ISpline";
/**
 * Options passed to a {@link SplineMountainRenderableSeries} at construction time
 */
export interface ISplineMountainRenderableSeriesOptions extends IBaseMountainRenderableSeriesOptions {
    /**
     * A number of interpolation points being used for the Spline,
     * where value 0 means no interpolation.
     */
    interpolationPoints?: number;
}
/**
 * Defines a mountain/area series or JavaScript mountain chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a spline mountain series to a {@link SciChartSurface} you need to declare both the {@link SplineMountainRenderableSeries | RenderableSeries}
 * and a {@link XyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyDataSeries(wasmContext);
 * dataSeries.append(1,2);
 * dataSeries.append(1,2);
 * // Create the renderableSeries
 * const mountainSeries = new SplineMountainRenderableSeries(wasmContext);
 * mountainSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(mountainSeries);
 * ```
 */
export declare class SplineMountainRenderableSeries extends BaseMountainRenderableSeries implements ISpline {
    readonly type = ESeriesType.SplineMountainSeries;
    protected isSplineProperty: boolean;
    private interpolationPointsProperty;
    /**
     * Creates an instance of the {@link SplineMountainRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link ISplineMountainRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: ISplineMountainRenderableSeriesOptions);
    get isSpline(): boolean;
    /**
     * Gets or sets the interpolationPoints being used for the Spline
     */
    get interpolationPoints(): number;
    /**
     * Gets or sets the interpolationPoints being used for the Spline
     */
    set interpolationPoints(value: number);
    get xSplineValues(): SCRTDoubleVector;
    get ySplineValues(): SCRTDoubleVector;
    /**
     * Set false to disable the warning if the spline cannot be calculated
     */
    get warnOnSplineFailure(): boolean;
    /**
     * Set false to disable the warning if the spline cannot be calculated
     */
    set warnOnSplineFailure(value: boolean);
    updateSplineValues(): void;
    /** @deprecated This is now handled within the renderDataTransform */
    onSplineFailure(): void;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
}
