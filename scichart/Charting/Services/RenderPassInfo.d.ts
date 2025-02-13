import { NumberRange } from "../../Core/NumberRange";
import { Rect } from "../../Core/Rect";
import { IPointSeries } from "../Model/PointSeries/IPointSeries";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
export declare type TSeriesRenderPassInfo = {
    pointSeries: IPointSeries;
    renderableSeries: IRenderableSeries;
    indicesRange: NumberRange;
    resamplingHash: number;
};
export declare class RenderPassInfo {
    renderableSeriesArray: IRenderableSeries[];
    seriesViewRect: Rect;
    constructor(seriesCount: number, seriesViewRect: Rect);
}
