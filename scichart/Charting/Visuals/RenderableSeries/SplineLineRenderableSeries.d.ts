import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { BaseLineRenderableSeries, IBaseLineRenderableSeriesOptions } from "./BaseLineRenderableSeries";
import { ISpline } from "./ISpline";
export interface ISplineLineRenderableSeriesOptions extends IBaseLineRenderableSeriesOptions {
    /**
     * A number of interpolation points being used for the Spline,
     * where value 0 means no interpolation.
     */
    interpolationPoints?: number;
}
/**
 * Defines a line-series or line chart type with Cubic Spline interpolation in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link SplineLineRenderableSeries | RenderableSeries}
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
 * const lineSeries = new SplineLineRenderableSeries(wasmContext);
 * lineSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(lineSeries);
 * ```
 */
export declare class SplineLineRenderableSeries extends BaseLineRenderableSeries implements ISpline {
    readonly type = ESeriesType.SplineLineSeries;
    protected isSplineProperty: boolean;
    private interpolationPointsProperty;
    /**
     * Creates an instance of the {@link SplineLineRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link ISplineLineRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: ISplineLineRenderableSeriesOptions);
    get xSplineValues(): SCRTDoubleVector;
    get ySplineValues(): SCRTDoubleVector;
    get isSpline(): boolean;
    /**
     * Gets or sets the interpolationPoints being used for the Spline
     */
    get interpolationPoints(): number;
    /**
     * Gets or sets the interpolationPoints being used for the Spline
     */
    set interpolationPoints(value: number);
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
