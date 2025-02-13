import { HitTestInfo } from "../../Visuals/RenderableSeries/HitTest/HitTestInfo";
import { IRenderableSeries } from "../../Visuals/RenderableSeries/IRenderableSeries";
import { SeriesInfo } from "./SeriesInfo";
export declare class XyzSeriesInfo extends SeriesInfo {
    zValue: number;
    constructor(renderableSeries: IRenderableSeries, hitTestInfo: HitTestInfo);
    get formattedZValue(): string;
}
