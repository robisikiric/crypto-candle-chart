import { SCRTDoubleVector } from "../../../types/TSciChart";
import { XyyDataSeries } from "../XyyDataSeries";
import { BasePointSeriesWrapped } from "./BasePointSeriesWrapped";
import { IXyyPointSeries } from "./IPointSeries";
export declare class XyyPointSeriesWrapped extends BasePointSeriesWrapped implements IXyyPointSeries {
    readonly y1Values: SCRTDoubleVector;
    constructor(dataSeries: XyyDataSeries, yValues?: SCRTDoubleVector, y1Values?: SCRTDoubleVector);
}
