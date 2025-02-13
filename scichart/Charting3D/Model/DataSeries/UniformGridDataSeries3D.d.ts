import { NumberRange } from "../../../Core/NumberRange";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { EDataSeriesType3D } from "./BaseDataSeries3D";
import { BaseGridDataSeries3D, IBaseGridDataSeries3DOptions } from "./BaseGridDataSeries3D";
/**
 * Optional parameters passed to {@link UniformGridDataSeries3D} to configure the series
 */
export interface IUniformGridDataSeries3DOptions extends IBaseGridDataSeries3DOptions {
    /**
     * xStart defines the Start point on the {@link AxisBase3D | XAxis} where this grid or mesh will be drawn
     */
    xStart?: number;
    /**
     * xStep defines Step on the {@link AxisBase3D | XAxis} for each cell in the grid or mesh
     */
    xStep?: number;
    /**
     * zStart defines the Start point on the {@link AxisBase3D | ZAxis} where this grid or mesh will be drawn
     */
    zStart?: number;
    /**
     * zStep defines Step on the {@link AxisBase3D | ZAxis} for each cell in the grid or mesh
     */
    zStep?: number;
}
/**
 * @summary The {@link UniformGridDataSeries3D} wraps a 2D array of numbers which become the Y-values (heights) in various
 * {@link BaseRenderableSeries3D} in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}.
 * @description
 * The {@link SurfaceMeshRenderableSeries3D} requires a 2D array of numbers to map to Y-values (heights).
 *
 * The {@link xStart}, {@link xStep} properties define the extents of the data in the X-direction, and {@link yStart}, {@link yStep}
 * define the extents of the data in the Y-direction.
 *
 * Y-values may be updated via manipulating the array returned by {@link getYValues}, or by setting a new array to {@link setYValues}. When
 * manpulating data directly, be sure to call {@link notifyDataChanged} to inform SciChart to redraw.
 */
export declare class UniformGridDataSeries3D extends BaseGridDataSeries3D {
    type: EDataSeriesType3D;
    private xStartProperty;
    private xStepProperty;
    private zStartProperty;
    private zStepProperty;
    /**
     * Creates an instance of a {@link UniformGridDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options optional parameters of type {@link IUniformGridDataSeries3DOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart3D, options?: IUniformGridDataSeries3DOptions);
    /**
     * xStart defines the Start point on the {@link AxisBase3D | XAxis} where this grid or mesh will be drawn
     */
    get xStart(): number;
    /**
     * xStart defines the Start point on the {@link AxisBase3D | XAxis} where this grid or mesh will be drawn
     */
    set xStart(xStart: number);
    /**
     * xStep defines Step on the {@link AxisBase3D | XAxis} for each cell in the grid or mesh
     */
    get xStep(): number;
    /**
     * xStep defines Step on the {@link AxisBase3D | XAxis} for each cell in the grid or mesh
     */
    set xStep(xStep: number);
    /**
     * zStart defines the Start point on the {@link AxisBase3D | ZAxis} where this grid or mesh will be drawn
     */
    get zStart(): number;
    /**
     * zStart defines the Start point on the {@link AxisBase3D | ZAxis} where this grid or mesh will be drawn
     */
    set zStart(zStart: number);
    /**
     * zStep defines Step on the {@link AxisBase3D | ZAxis} for each cell in the grid or mesh
     */
    get zStep(): number;
    /**
     * zStep defines Step on the {@link AxisBase3D | ZAxis} for each cell in the grid or mesh
     */
    set zStep(zStep: number);
    /**
     * @inheritDoc
     */
    get xRange(): NumberRange;
    /**
     * @inheritDoc
     */
    get zRange(): NumberRange;
    /**
     * @inheritDoc
     */
    getX(xIndex: number): number;
    /**
     * @inheritDoc
     */
    getZ(zIndex: number): number;
}
