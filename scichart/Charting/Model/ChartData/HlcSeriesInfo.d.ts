import { HitTestInfo } from "../../Visuals/RenderableSeries/HitTest/HitTestInfo";
import { IRenderableSeries } from "../../Visuals/RenderableSeries/IRenderableSeries";
import { SeriesInfo } from "./SeriesInfo";
export declare class HlcSeriesInfo extends SeriesInfo {
    highValue: number;
    lowValue: number;
    closeValue: number;
    constructor(renderableSeries: IRenderableSeries, hitTestInfo: HitTestInfo);
    get formattedHighValue(): string;
    get formattedLowValue(): string;
    get formattedCloseValue(): string;
}
