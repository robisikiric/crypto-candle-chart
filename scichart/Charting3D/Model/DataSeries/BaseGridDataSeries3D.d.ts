import { NumberRange } from "../../../Core/NumberRange";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { BaseDataSeries3D, EDataSeriesType3D, IBaseDataSeries3DOptions } from "./BaseDataSeries3D";
import { IDataSeries3D } from "./IDataSeries3D";
/**
 * Optional parameters passed to the {@link BaseGridDataSeries3D} at construct time.
 */
export interface IBaseGridDataSeries3DOptions extends IBaseDataSeries3DOptions {
    yValues: number[][];
}
/**
 * Interface to a {@link BaseGridDataSeries3D}
 */
export interface IGridDataSeries3D extends IDataSeries3D {
    /**
     * The zSize is the HEIGHT or number of rows of the 2-dimensional array,
     * e.g. [[1, 2][3, 4][5, 6]] has a height of 3
     */
    readonly zSize: number;
    /**
     * The xSize is the WIDTH or number of elements in each or of the 2-dimensional array,
     * e.g. [[1, 2][3, 4][5, 6]] has a xSize of 2
     */
    readonly xSize: number;
    /**
     * Gets the YValue at the specific Z,X index where Z must be within 0-zSize and X must be within 0-xSize
     * @param zIndex the z-index from 0 to zSize
     * @param xIndex the x-index from 0 to xSize
     */
    getYValue(zIndex: number, xIndex: number): number;
    /**
     * Gets the Y-Values array as a two dimensional array. Output is in the format YValues[z][x]
     * where z is 0 to zSize and X is 0 to xSize.
     */
    getYValues(): number[][];
    /**
     * Sets a 2D array of YValues. Input is in the format YValues[z][x]
     * where z is 0 to zSize and X is 0 to xSize
     * Note that setting the YValues involves a clone. Once the array has been set you cannot manipulate
     * the input array and expect changes on the chart.
     * @param zValues
     */
    setYValues(YValues: number[][]): void;
}
/**
 * @summary The base class for a Grid (two-dimensional array) DataSeries in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries3D | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * The Grid DataSeries type is used for 3D Charts that have a uniform grid of values, for example {@link SurfaceMeshRenderableSeries3D},
 * which draws a 3D surface-plot or mesh chart with contours.
 * @remarks See derived type {@link UniformGridDataSeries3D} for a concrete implementation
 */
export declare abstract class BaseGridDataSeries3D extends BaseDataSeries3D implements IGridDataSeries3D {
    /**
     * @inheritDoc
     */
    abstract readonly type: EDataSeriesType3D;
    protected yRangeCached: NumberRange;
    private yValuesProperty;
    private xSizeProperty;
    private zSizeProperty;
    /**
     * Creates an instance of the {@link BaseGridDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options optional parameters of type {@link IBaseGridDataSeries3DOptions} to configure the series
     */
    protected constructor(webAssemblyContext: TSciChart3D, options?: IBaseGridDataSeries3DOptions);
    /**
     * Gets the total extends of the GridDataSeries3D in the x-range
     */
    abstract get xRange(): NumberRange;
    /**
     * Gets the total extends of the GridDataSeries3D in the z-range
     */
    abstract get zRange(): NumberRange;
    /**
     * Gets the total extends of the GridDataSeries3D in the y-range
     */
    get yRange(): NumberRange;
    /**
     * The zSize is the HEIGHT or number of rows of the 2-dimensional array,
     * e.g. [[1, 2][3, 4][5, 6]] has a height of 3
     */
    get zSize(): number;
    /**
     * The xSize is the WIDTH or number of elements in each or of the 2-dimensional array,
     * e.g. [[1, 2][3, 4][5, 6]] has a xSize of 2
     */
    get xSize(): number;
    /**
     * Sets a 2D array of YValues. Input is in the format YValues[z][x]
     * where z is 0 to zSize and X is 0 to xSize
     * Note that setting the YValues involves a clone. Once the array has been set you cannot manipulate
     * the input array and expect changes on the chart.
     * @param zValues
     */
    setYValues(YValues: number[][]): void;
    /**
     * Gets the Y-Values array as a two dimensional array. Output is in the format YValues[z][x]
     * where z is 0 to zSize and X is 0 to xSize.
     */
    getYValues(): number[][];
    /**
     * Gets the YValue at the specific Z,X index where Z must be within 0-zSize and X must be within 0-xSize
     * @param zIndex the z-index from 0 to zSize
     * @param xIndex the x-index from 0 to xSize
     */
    getYValue(zIndex: number, xIndex: number): number;
    /**
     * Sets the YValue at the specific Z,X index where Z must be within 0-zSize and X must be within 0-xSize
     * @param zIndex the z-index from 0 to zSize
     * @param xIndex the x-index from 0 to xSize
     * @param YValue the new Height-value
     */
    setYValue(zIndex: number, xIndex: number, yValue: number): void;
    /**
     * @inheritDoc
     */
    notifyDataChanged(): void;
}
