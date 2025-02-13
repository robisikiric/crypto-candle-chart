import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { XyPointSeriesResampled } from "../../../Model/PointSeries/XyPointSeriesResampled";
import { XyyPointSeriesResampled } from "../../../Model/PointSeries/XyyPointSeriesResampled";
import { RenderPassData } from "../../../Services/RenderPassData";
import { BaseRenderableSeries } from "../BaseRenderableSeries";
import { ISeriesDrawingProvider } from "../DrawingProviders/ISeriesDrawingProvider";
import { BaseRenderDataTransform } from "./BaseRenderDataTransform";
export declare const bezierTransform: (xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, indexes: SCRTDoubleVector, oldX: SCRTDoubleVector, oldY: SCRTDoubleVector, iStart: number, iEnd: number, interpolationPoints: number, curvature: number, y1Values?: SCRTDoubleVector) => void;
export interface IBezierRenderDataTransformOptions {
    /** The number of points to add between each data point.  Default 20
     * These are Not uniformly distributed, but clutered around the data points to give smoother curves
     */
    interpolationPoints?: number;
    /** A scale factor for the tightness of the curves. Valid values 0 to 1.  Lower = tighter curves  */
    curvature?: number;
}
/**
 * A RenderDataTransform that calculates a Cubic Bezier curve over an XyDataSeries, while respecting the bounds of the data.
 */
export declare class BezierRenderDataTransform extends BaseRenderDataTransform<XyPointSeriesResampled> {
    private interpolationPointsProperty;
    private curvatureProperty;
    /** The number of points to add between each data point.  Default 20
     * These are Not uniformly distributed, but clutered around the data points to give smoother curves
     */
    get interpolationPoints(): number;
    set interpolationPoints(value: number);
    /** A scale factor for the tightness of the curves. Valid values 0 to 1.  Lower = tighter curves  */
    get curvature(): number;
    set curvature(value: number);
    constructor(parentSeries: BaseRenderableSeries, wasmContext: TSciChart, drawingProviders?: Array<ISeriesDrawingProvider>, options?: IBezierRenderDataTransformOptions);
    protected createPointSeries(): XyPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
/**
 * A RenderDataTransform that calculates a Cubic Bezier curve over the an Xyy dataSeries, while respecting the bounds of the data.
 */
export declare class XyyBezierRenderDataTransform extends BaseRenderDataTransform<XyyPointSeriesResampled> {
    private interpolationPointsProperty;
    private curvatureProperty;
    /** The number of points to add between each data point.  Default 20
     * These are Not uniformly distributed, but clutered around the data points to give smoother curves
     */
    get interpolationPoints(): number;
    set interpolationPoints(value: number);
    /** A scale factor for the tightness of the curves. Valid values 0 to 1.  Lower = tighter curves  */
    get curvature(): number;
    set curvature(value: number);
    constructor(parentSeries: BaseRenderableSeries, wasmContext: TSciChart, drawingProviders?: Array<ISeriesDrawingProvider>, options?: IBezierRenderDataTransformOptions);
    protected forceYGreaterThanY1: boolean;
    protected createPointSeries(): XyyPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
/**
 * A RenderDataTransform that calculates a Cubic Bezier curve over the an Xyy dataSeries, while respecting the bounds of the data.
 * This also restricts the Y1 values to be less than the Y values, allowing this to be used for stacked series.
 */
export declare class SmoothStackedRenderDataTransform extends XyyBezierRenderDataTransform {
    protected forceYGreaterThanY1: boolean;
}
