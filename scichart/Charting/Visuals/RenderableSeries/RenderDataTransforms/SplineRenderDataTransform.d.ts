import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { XyPointSeriesResampled } from "../../../Model/PointSeries/XyPointSeriesResampled";
import { RenderPassData } from "../../../Services/RenderPassData";
import { BaseRenderDataTransform } from "./BaseRenderDataTransform";
export declare class SplineRenderDataTransform extends BaseRenderDataTransform<XyPointSeriesResampled> {
    interpolationPoints: number;
    warnOnSplineFailure: boolean;
    useForYRange: boolean;
    protected createPointSeries(): XyPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
