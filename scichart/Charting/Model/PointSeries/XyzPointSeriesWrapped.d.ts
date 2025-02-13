import { SCRTDoubleVector } from "../../../types/TSciChart";
import { XyzDataSeries } from "../XyzDataSeries";
import { BasePointSeriesWrapped } from "./BasePointSeriesWrapped";
import { IXyzPointSeries } from "./IPointSeries";
export declare class XyzPointSeriesWrapped extends BasePointSeriesWrapped implements IXyzPointSeries {
    readonly zValues: SCRTDoubleVector;
    constructor(dataSeries: XyzDataSeries);
}
