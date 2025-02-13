import { NumberRange } from "../../../Core/NumberRange";
import { ESeriesType } from "../../../types/SeriesType";
import { SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { BaseBandRenderableSeries, IBaseBandRenderableSeriesOptions } from "./BaseBandRenderableSeries";
import { ISpline } from "./ISpline";
/**
 * Optional parameters passed to the constructor of {@link SplineBandRenderableSeries}
 */
export interface ISplineBandRenderableSeriesOptions extends IBaseBandRenderableSeriesOptions {
    /**
     * A number of interpolation points being used for the Spline,
     * where value 0 means no interpolation.
     */
    interpolationPoints?: number;
}
/**
 * Defines a JavaScript Spline Band-series or High-Low polygon fill chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a line series to a {@link SciChartSurface} you need to declare both the {@link SplineBandRenderableSeries | RenderableSeries}
 * and a {@link XyyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyyDataSeries(wasmContext);
 * dataSeries.append(1,2,3);
 * dataSeries.append(2,3,4);
 * // Create the renderableSeries
 * const bandSeries = new SplineBandRenderableSeries(wasmContext);
 * bandSeries.dataSeries = dataSeries;
 * // Set interpolation points
 * bandSeries.interpolationPoints = 10;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(bandSeries);
 * ```
 */
export declare class SplineBandRenderableSeries extends BaseBandRenderableSeries implements ISpline {
    readonly type = ESeriesType.SplineBandSeries;
    protected isSplineProperty: boolean;
    private interpolationPointsProperty;
    /**
     * Creates an instance of the {@link SplineBandRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link ISplineBandRenderableSeriesOptions} applied when constructing the series type
     */
    constructor(webAssemblyContext: TSciChart, options?: ISplineBandRenderableSeriesOptions);
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
    get y1SplineValues(): SCRTDoubleVector;
    /**
     * Set false to disable the warning if the spline cannot be calculated
     */
    get warnOnSplineFailure(): boolean;
    /**
     * Set false to disable the warning if the spline cannot be calculated
     */
    set warnOnSplineFailure(value: boolean);
    /**
     * Updates spline values
     */
    updateTransformedValues(): void;
    updateSplineValues(): void;
    /** @deprecated This is now handled within the renderDataTransform */
    onSplineFailure(): void;
    /** @inheritDoc */
    getYRange(xVisibleRange: NumberRange, isXCategoryAxis?: boolean): NumberRange;
    /** @inheritDoc */
    toJSON(excludeData?: boolean): import("../../..").TSeriesDefinition;
}
