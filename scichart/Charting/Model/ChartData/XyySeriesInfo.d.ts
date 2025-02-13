import { HitTestInfo } from "../../Visuals/RenderableSeries/HitTest/HitTestInfo";
import { IRenderableSeries } from "../../Visuals/RenderableSeries/IRenderableSeries";
import { SeriesInfo } from "./SeriesInfo";
export declare class XyySeriesInfo extends SeriesInfo {
    y1Value: number;
    y1Coordinate: number;
    isFirstSeries: boolean;
    point2y1Value: number;
    point2y1Coordinate: number;
    constructor(renderableSeries: IRenderableSeries, hitTestInfo: HitTestInfo);
    get formattedY1Value(): string;
}
