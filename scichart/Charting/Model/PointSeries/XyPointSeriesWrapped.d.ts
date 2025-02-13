import { SCRTDoubleVector } from "../../../types/TSciChart";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesValueType } from "../IDataSeries";
import { BasePointSeriesWrapped } from "./BasePointSeriesWrapped";
import { IXyPointSeries } from "./IPointSeries";
export declare class XyPointSeriesWrapped extends BasePointSeriesWrapped implements IXyPointSeries {
    constructor(dataSeries: BaseDataSeries, yValues?: SCRTDoubleVector, valueType?: EDataSeriesValueType);
}
