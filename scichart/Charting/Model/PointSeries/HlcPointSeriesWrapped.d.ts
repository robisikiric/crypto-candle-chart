import { SCRTDoubleVector } from "../../../types/TSciChart";
import { HlcDataSeries } from "../HlcDataSeries";
import { BasePointSeriesWrapped } from "./BasePointSeriesWrapped";
import { IHlcPointSeries } from "./IPointSeries";
export declare class HlcPointSeriesWrapped extends BasePointSeriesWrapped implements IHlcPointSeries {
    readonly highValues: SCRTDoubleVector;
    readonly lowValues: SCRTDoubleVector;
    readonly closeValues: SCRTDoubleVector;
    constructor(dataSeries: HlcDataSeries);
}
