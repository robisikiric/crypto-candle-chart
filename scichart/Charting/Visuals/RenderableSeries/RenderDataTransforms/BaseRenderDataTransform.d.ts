import { DeletableEntity } from "../../../../Core/DeletableEntity";
import { IDeletable } from "../../../../Core/IDeletable";
import { NumberRange } from "../../../../Core/NumberRange";
import { IDataChangeArgs } from "../../../Model/IDataSeries";
import { BasePointSeriesResampled } from "../../../Model/PointSeries/BasePointSeriesResampled";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { OhlcPointSeriesResampled } from "../../../Model/PointSeries/OhlcPointSeriesResampled";
import { XyPointSeriesResampled } from "../../../Model/PointSeries/XyPointSeriesResampled";
import { XyyPointSeriesResampled } from "../../../Model/PointSeries/XyyPointSeriesResampled";
import { RenderPassData } from "../../../Services/RenderPassData";
import { TSciChart } from "../../SciChartSurface";
import { BaseRenderableSeries } from "../BaseRenderableSeries";
import { ISeriesDrawingProvider } from "../DrawingProviders/ISeriesDrawingProvider";
export interface IRenderDataTransform extends IDeletable {
    /** The series the transform is attached to */
    readonly parentSeries: BaseRenderableSeries;
    /** Whether then transform will run when the series is drawn.
     * This is set true initially, and when data changes, and is set to false when the transform does run.
     * If your transform depends on any other property, you must set this true if that property changes
     */
    requiresTransform: boolean;
    /** The drawingProviders on the parentSeries to which this transform applies */
    drawingProviders: Array<ISeriesDrawingProvider>;
    /** The method that is called to run the transform.  Do not override this, instead override runTransformInternal on {@link BaseRenderDataTransform} */
    runTransform(renderPassData: RenderPassData): RenderPassData;
    /** */
    onDataChange(args: IDataChangeArgs): void;
    /** A flag to tell the parent series if the transformed values should be used when calculating data range  */
    useForYRange: boolean;
    /** The pointSeries that stores the result of the transform */
    pointSeries: BasePointSeriesResampled;
}
/**
 * An abstract base class for RenderDataTransforms.  Use these to convert data immediately before drawing.
 */
export declare abstract class BaseRenderDataTransform<T extends BasePointSeriesResampled> extends DeletableEntity implements IRenderDataTransform {
    protected wasmContext: TSciChart;
    protected lastIndexRange: NumberRange;
    protected lastResamplingHash: number;
    /** @inheritDoc */
    readonly parentSeries: BaseRenderableSeries;
    /** @inheritDoc */
    readonly drawingProviders: Array<ISeriesDrawingProvider>;
    /** @inheritDoc */
    pointSeries: T;
    /** @inheritDoc */
    requiresTransform: boolean;
    /** @inheritDoc */
    useForYRange: boolean;
    constructor(parentSeries: BaseRenderableSeries, wasmContext: TSciChart, drawingProviders?: Array<ISeriesDrawingProvider>);
    /** @inheritDoc */
    runTransform(renderPassData: RenderPassData): RenderPassData;
    /** @inheritDoc */
    onDataChange(args: IDataChangeArgs): void;
    delete(): void;
    protected makeRenderPassData(originalRPD: RenderPassData, pointSeries: IPointSeries): RenderPassData;
    /** This function must return a new pointSeries which extends BasePointSeriesResampled and matches the type specified in the class definintion
     * It does NOT have to be the same shape as the data on the series you are transforming.
     * A typical implementation is
     * ``` ts
     * protected createPointSeries(): XyPointSeriesResampled {
     *   return new XyPointSeriesResampled(this.wasmContext, new NumberRange(0, 0));
     * }
     * ```
     */
    protected abstract createPointSeries(): T;
    /**
     * Implement the transform here.
     * @remarks
     * To do no transformation, return renderPassData.pointSeries
     * Otherwise, clear all the vectors on this.pointSeries, push the new values, then return this.pointSeries
     * Below is sample code which splits xy data to xyy based on the metadata
     * ```ts
     * protected runTransformInternal(renderPassData: RenderPassData): IPointSeries {
     *     if (!renderPassData.pointSeries) {
     *       return this.pointSeries;
     *     }
     *     const {
     *       xValues: oldX,
     *       yValues: oldY,
     *       indexes: oldI,
     *       resampled,
     *     } = renderPassData.pointSeries;
     *     const { xValues, yValues, y1Values, indexes } = this.pointSeries;
     *     // clear the vectors on the target
     *     xValues.clear();
     *     yValues.clear();
     *     y1Values.clear();
     *     indexes.clear();
     *     // indexRange tells the drawing to only use a subset of the data.  If data has been resampled, then always use all of it
     *     const iStart = resampled ? 0 : renderPassData.indexRange.min;
     *     const iEnd = resampled ? oldX.size() - 1 : renderPassData.indexRange?.max;
     *     const ds = this.parentSeries.dataSeries as XyDataSeries;
     *     for (let i = iStart; i <= iEnd; i++) {
     *       // If data has been resampled, we need the original index in order to get the correct metadata
     *       const index = resampled ? oldI.get(i) : i;
     *       const md = ds.getMetadataAt(index);
     *       xValues.push_back(oldX.get(i));
     *       indexes.push_back(index);
     *       if (md.isSelected) {
     *         yValues.push_back(Number.NaN);
     *         y1Values.push_back(oldY.get(i));
     *       } else {
     *         yValues.push_back(oldY.get(i));
     *         y1Values.push_back(Number.NaN);
     *       }
     *     }
     *     return this.pointSeries;
     *   }
     * ```
     */
    protected abstract runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
/**
 * A base class for a {@link IRenderDataTransform} that returns XyPointSeries
 * You must extend this and override runTransformInternal or it will throw an error
 */
export declare class XyBaseRenderDataTransform extends BaseRenderDataTransform<XyPointSeriesResampled> {
    protected createPointSeries(): XyPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
/**
 * A base class for a {@link IRenderDataTransform} that returns XyyPointSeries
 * You must extend this and override runTransformInternal or it will throw an error
 */
export declare class XyyBaseRenderDataTransform extends BaseRenderDataTransform<XyyPointSeriesResampled> {
    protected createPointSeries(): XyyPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
/**
 * A base class for a {@link IRenderDataTransform} that returns OhlcPointSeries
 * You must extend this and override runTransformInternal or it will throw an error
 */
export declare class OhlcBaseRenderDataTransform extends BaseRenderDataTransform<OhlcPointSeriesResampled> {
    protected createPointSeries(): OhlcPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
