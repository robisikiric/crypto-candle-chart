import { SCRTDoubleVector } from "../../../types/TSciChart";
import { OhlcDataSeries } from "../OhlcDataSeries";
import { BasePointSeriesWrapped } from "./BasePointSeriesWrapped";
import { IOhlcPointSeries } from "./IPointSeries";
export declare class OhlcPointSeriesWrapped extends BasePointSeriesWrapped implements IOhlcPointSeries {
    readonly openValues: SCRTDoubleVector;
    readonly highValues: SCRTDoubleVector;
    readonly lowValues: SCRTDoubleVector;
    readonly closeValues: SCRTDoubleVector;
    constructor(dataSeries: OhlcDataSeries);
}
