import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { XyyPointSeriesResampled } from "../../../Model/PointSeries/XyyPointSeriesResampled";
import { RenderPassData } from "../../../Services/RenderPassData";
import { BaseRenderDataTransform } from "./BaseRenderDataTransform";
export declare class XyySplineRenderDataTransform extends BaseRenderDataTransform<XyyPointSeriesResampled> {
    interpolationPoints: number;
    warnOnSplineFailure: boolean;
    useForYRange: boolean;
    protected createPointSeries(): XyyPointSeriesResampled;
    protected runTransformInternal(renderPassData: RenderPassData): IPointSeries;
}
